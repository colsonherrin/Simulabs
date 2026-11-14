using System;
using UnityEngine;

namespace Simulacra
{
    /// <summary>
    /// Captures the microphone and emits base64 PCM16 mono at 24 kHz in ~60 ms chunks.
    /// Works on any Unity platform with a Microphone (Quest, Android host for XREAL, editor).
    /// </summary>
    public class MicStreamer : MonoBehaviour
    {
        public const int TargetRate = 24000;

        /// <summary>
        /// While true the stream carries silence instead of the microphone. The stream itself never
        /// stops: speech-to-text needs continuous audio to notice that the user finished talking.
        /// </summary>
        public bool Muted { get; set; }
        public bool IsCapturing => _clip != null;
        public float Level { get; private set; }

        public event Action<string> Chunk;

        private AudioClip _clip;
        private string _device;
        private int _readPos;
        private readonly float[] _readBuffer = new float[480];
        private double _resamplePos; // fractional read index carried between frames
        private float _lastSample;
        private readonly short[] _out = new short[TargetRate / 1000 * 60];
        private int _outCount;
        private byte[] _bytes;
        private float _nextPermissionAsk;

        private void Update()
        {
            if (_clip == null) { TryStart(); return; }

            int pos = Microphone.GetPosition(_device);
            if (pos < 0 || pos == _readPos) return;
            int available = pos - _readPos;
            if (available < 0) available += _clip.samples;
            if (available > _clip.samples / 2) { _readPos = pos; return; } // fell far behind; skip

            // Fixed-size blocks: AudioClip.GetData fills the whole array and wraps at the clip end.
            while (available >= _readBuffer.Length)
            {
                _clip.GetData(_readBuffer, _readPos);
                _readPos = (_readPos + _readBuffer.Length) % _clip.samples;
                available -= _readBuffer.Length;
                Resample(_readBuffer, _readBuffer.Length);
            }
        }

        private void TryStart()
        {
#if UNITY_ANDROID && !UNITY_EDITOR
            if (!UnityEngine.Android.Permission.HasUserAuthorizedPermission(UnityEngine.Android.Permission.Microphone))
            {
                // The platform layer normally asks at startup; ask ourselves only if that did not happen.
                if (Application.isFocused && Time.unscaledTime > _nextPermissionAsk && Time.unscaledTime > 6f)
                {
                    _nextPermissionAsk = Time.unscaledTime + 10f;
                    UnityEngine.Android.Permission.RequestUserPermission(UnityEngine.Android.Permission.Microphone);
                }
                return;
            }
#endif
            if (Microphone.devices.Length == 0) return;
            _device = Microphone.devices[0];
            Microphone.GetDeviceCaps(_device, out int minFreq, out int maxFreq);
            int rate = 48000;
            if (maxFreq > 0) rate = Mathf.Clamp(rate, minFreq, maxFreq);
            _clip = Microphone.Start(_device, true, 5, rate);
            _readPos = 0;
            _resamplePos = 0;
            if (_clip == null) Debug.LogWarning("[Simulacra] Microphone.Start failed");
            else Debug.Log($"[Simulacra] mic '{_device}' at {_clip.frequency} Hz");
        }

        /// <summary>Linear resampling from the mic rate to 24 kHz, continuous across calls.</summary>
        private void Resample(float[] src, int count)
        {
            double step = (double)_clip.frequency / TargetRate;
            float sum = 0f;
            while (_resamplePos < count)
            {
                int i = (int)_resamplePos;
                float a = i == 0 ? _lastSample : src[i - 1];
                float b = src[i];
                float s = Mathf.Lerp(a, b, (float)(_resamplePos - i));
                sum += s * s;
                _out[_outCount++] = (short)(Mathf.Clamp(s, -1f, 1f) * 32767f);
                if (_outCount == _out.Length) Flush();
                _resamplePos += step;
            }
            _resamplePos -= count;
            _lastSample = src[count - 1];
            Level = Mathf.Lerp(Level, Mathf.Sqrt(sum / Mathf.Max(1, count / (float)step)), 0.5f);
        }

        private void Flush()
        {
            int n = _outCount;
            _outCount = 0;
            if (Chunk == null) return;
            if (Muted) Array.Clear(_out, 0, n);
            if (_bytes == null || _bytes.Length != n * 2) _bytes = new byte[n * 2];
            Buffer.BlockCopy(_out, 0, _bytes, 0, n * 2);
            Chunk.Invoke(Convert.ToBase64String(_bytes));
        }

        private void OnDisable()
        {
            if (_clip != null) Microphone.End(_device);
            _clip = null;
        }
    }
}
