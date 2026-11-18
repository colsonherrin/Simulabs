// Spoken commands without any voice service: the browser's own speech recognition, where it has
// one. It only turns speech into text; sim.command() decides what a phrase means. Not every
// browser offers this (and a headset's may not), so the buttons in the headset do the same jobs.

export function createListener(onText, onState = () => {}) {
  const SR = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
  let rec = null;
  let wanted = false;
  let state = SR ? 'off' : 'unavailable';
  const set = (s) => {
    if (s === state) return;
    state = s;
    onState(s);
  };
  function begin() {
    if (!SR || !wanted) return;
    try {
      rec = new SR();
      rec.continuous = true;
      rec.interimResults = false;
      rec.lang = 'en-US';
      rec.onstart = () => set('listening');
      rec.onresult = (e) => {
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) onText(String(e.results[i][0].transcript || '').trim());
        }
      };
      rec.onerror = (e) => {
        // Refused outright: do not keep asking.
        if (/not-allowed|service-not-allowed|audio-capture/.test(e.error)) {
          wanted = false;
          set('blocked');
        }
      };
      // It stops by itself after a pause; keep it going for as long as it is wanted.
      rec.onend = () => {
        rec = null;
        if (wanted) setTimeout(begin, 300);
        else if (state === 'listening') set('off');
      };
      rec.start();
    } catch (e) {
      rec = null;
      set('blocked');
    }
  }
  return {
    available: !!SR,
    state: () => state,
    start() {
      if (!SR || wanted) return;
      wanted = true;
      begin();
    },
    stop() {
      wanted = false;
      try { if (rec) rec.stop(); } catch (e) { /* already stopped */ }
      if (state === 'listening') set('off');
    },
  };
}
