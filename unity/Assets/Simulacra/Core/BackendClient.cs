using System;
using System.Collections.Concurrent;
using System.IO;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace Simulacra
{
    /// <summary>
    /// WebSocket link to the Simulacra backend (protocol v1, JSON text frames). All socket IO runs
    /// off the main thread so a slow network can never stall rendering; messages are handed to
    /// listeners on the main thread from Update().
    /// </summary>
    public class BackendClient : MonoBehaviour
    {
        public string url = "ws://127.0.0.1:8787/device";

        public bool IsConnected { get; private set; }
        public string LastError { get; private set; } = "";

        public event Action Connected;
        public event Action Disconnected;
        public event Action<string, JObject> Message; // (type, body)

        private readonly ConcurrentQueue<string> _inbox = new ConcurrentQueue<string>();
        private readonly ConcurrentQueue<string> _outbox = new ConcurrentQueue<string>();
        private readonly SemaphoreSlim _outSignal = new SemaphoreSlim(0);
        private CancellationTokenSource _cts;
        private volatile int _state; // 0 none, 1 just connected, 2 just disconnected

        private void OnEnable()
        {
            _cts = new CancellationTokenSource();
            var token = _cts.Token;
            Task.Run(() => RunAsync(token));
        }

        private void OnDisable()
        {
            _cts?.Cancel();
            IsConnected = false;
        }

        public void Send(JObject message)
        {
            if (!IsConnected) return; // audio and poses are worthless once stale
            _outbox.Enqueue(message.ToString(Newtonsoft.Json.Formatting.None));
            _outSignal.Release();
        }

        private void Update()
        {
            int s = Interlocked.Exchange(ref _state, 0);
            if (s == 1) Connected?.Invoke();
            else if (s == 2) Disconnected?.Invoke();

            // Bounded per frame so a burst cannot cause a hitch.
            for (int i = 0; i < 40 && _inbox.TryDequeue(out string raw); i++)
            {
                try
                {
                    var obj = JObject.Parse(raw);
                    Message?.Invoke((string)obj["type"] ?? "", obj);
                }
                catch (Exception e)
                {
                    Debug.LogWarning("[Simulacra] bad message from backend: " + e.Message);
                }
            }
        }

        private async Task RunAsync(CancellationToken ct)
        {
            while (!ct.IsCancellationRequested)
            {
                using (var ws = new ClientWebSocket())
                {
                    try
                    {
                        using (var connectCts = CancellationTokenSource.CreateLinkedTokenSource(ct))
                        {
                            connectCts.CancelAfter(5000);
                            await ws.ConnectAsync(new Uri(url), connectCts.Token).ConfigureAwait(false);
                        }
                        while (_outbox.TryDequeue(out _)) { }
                        IsConnected = true;
                        LastError = "";
                        _state = 1;

                        using (var linked = CancellationTokenSource.CreateLinkedTokenSource(ct))
                        {
                            Task send = SendLoop(ws, linked.Token);
                            try { await ReceiveLoop(ws, linked.Token).ConfigureAwait(false); }
                            finally { linked.Cancel(); }
                            try { await send.ConfigureAwait(false); } catch { /* cancelled */ }
                        }
                    }
                    catch (Exception e)
                    {
                        if (!ct.IsCancellationRequested) LastError = e.GetType().Name + ": " + e.Message;
                    }
                }
                if (IsConnected) { IsConnected = false; _state = 2; }
                try { await Task.Delay(1500, ct).ConfigureAwait(false); } catch { return; }
            }
        }

        private async Task SendLoop(ClientWebSocket ws, CancellationToken ct)
        {
            while (!ct.IsCancellationRequested && ws.State == WebSocketState.Open)
            {
                await _outSignal.WaitAsync(ct).ConfigureAwait(false);
                while (_outbox.TryDequeue(out string msg))
                {
                    byte[] bytes = Encoding.UTF8.GetBytes(msg);
                    await ws.SendAsync(new ArraySegment<byte>(bytes), WebSocketMessageType.Text, true, ct).ConfigureAwait(false);
                }
            }
        }

        private async Task ReceiveLoop(ClientWebSocket ws, CancellationToken ct)
        {
            var buffer = new byte[64 * 1024];
            var stream = new MemoryStream();
            while (!ct.IsCancellationRequested && ws.State == WebSocketState.Open)
            {
                WebSocketReceiveResult r = await ws.ReceiveAsync(new ArraySegment<byte>(buffer), ct).ConfigureAwait(false);
                if (r.MessageType == WebSocketMessageType.Close) return;
                stream.Write(buffer, 0, r.Count);
                if (!r.EndOfMessage) continue;
                if (r.MessageType == WebSocketMessageType.Text)
                    _inbox.Enqueue(Encoding.UTF8.GetString(stream.GetBuffer(), 0, (int)stream.Length));
                stream.SetLength(0);
            }
        }
    }
}
