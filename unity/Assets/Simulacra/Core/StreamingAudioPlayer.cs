using System;
using UnityEngine;

namespace Simulacra
{
    /// <summary>
    /// Plays streamed PCM16 24 kHz speech through an AudioSource (so the voice is spatialised at the
    /// avatar's head). Thread-safe ring buffer feeding a streaming AudioClip.
    /// </summary>
    [RequireComponent(typeof(AudioSource))]
    public class StreamingAudioPlayer : MonoBehaviour
    {
        public const int Rate = 24000;

        /// <summary>Smoothed loudness of what is being played right now, 0..1. Drives lip sync.</summary>
        public float Level { get; private set; }

        /// <summary>True while speech is queued or was audible a moment ago.</summary>
        public bool IsSpeaking => _buffered > 0 || Time.unscaledTime - _lastAudible < 0.25f;

        private readonly float[] _ring = new float[Rate * 60]; // one minute of headroom
        private readonly object _lock = new object();
        private int _read, _write, _buffered;
        private volatile float _rawLevel;
        private volatile bool _audible;
        private float _lastAudible = -10f;
        private AudioSource _source;

        private void Awake()
        {
            _source = GetComponent<AudioSource>();
            _source.clip = AudioClip.Create("SimulacraVoice", Rate, 1, Rate, true, OnRead);
            _source.loop = true;
            _source.playOnAwake = false;
            _source.Play();
        }

        public void Enqueue(string base64Pcm16)
        {
            byte[] bytes = Convert.FromBase64String(base64Pcm16);
            int samples = bytes.Length / 2;
            lock (_lock)
            {
                for (int i = 0; i < samples; i++)
                {
                    if (_buffered == _ring.Length) break; // full: drop the tail rather than block
                    short s = (short)(bytes[i * 2] | (bytes[i * 2 + 1] << 8));
                    _ring[_write] = s / 32768f;
                    _write = (_write + 1) % _ring.Length;
                    _buffered++;
                }
            }
        }

        /// <summary>Drop everything queued (the user interrupted).</summary>
        public void Clear()
        {
            lock (_lock) { _read = _write = _buffered = 0; }
        }

        // Audio thread.
        private void OnRead(float[] data)
        {
            float sum = 0f;
            int served;
            lock (_lock)
            {
                served = Mathf.Min(data.Length, _buffered);
                for (int i = 0; i < served; i++)
                {
                    float s = _ring[_read];
                    data[i] = s;
                    sum += s * s;
                    _read = (_read + 1) % _ring.Length;
                }
                _buffered -= served;
            }
            for (int i = served; i < data.Length; i++) data[i] = 0f;
            _rawLevel = data.Length > 0 ? Mathf.Sqrt(sum / data.Length) : 0f;
            if (served > 0) _audible = true;
        }

        private void Update()
        {
            if (_audible) { _audible = false; _lastAudible = Time.unscaledTime; }
            float target = IsSpeaking ? Mathf.Clamp01(_rawLevel * 6f) : 0f;
            Level = Mathf.Lerp(Level, target, 1f - Mathf.Exp(-18f * Time.unscaledDeltaTime));
            if (!_source.isPlaying) _source.Play();
        }
    }
}
