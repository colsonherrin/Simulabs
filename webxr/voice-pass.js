// Where the live voice gets its credential when no key has been typed into the page.
//
// The site can name a relay (relay/worker.js) in sim-config.json at its root:
//   { "tokenUrl": "https://your-relay.workers.dev" }
// The relay holds the OpenAI key and gives out passes that are good only for starting a live voice
// call and expire within minutes, so no key is ever in the page.

let configured = null;

/** The relay address this site is configured with, or '' (looked up once). */
export function relayUrl() {
  if (!configured) {
    const places = [new URL('sim-config.json', document.baseURI).href, new URL('../sim-config.json', document.baseURI).href];
    configured = (async () => {
      for (const url of places) {
        try {
          const res = await fetch(url, { cache: 'no-cache' });
          if (!res.ok) continue;
          const cfg = await res.json();
          if (cfg && typeof cfg.tokenUrl === 'string' && /^https?:\/\//.test(cfg.tokenUrl)) return cfg.tokenUrl;
        } catch (e) { /* not there */ }
      }
      return '';
    })();
  }
  return configured;
}

/** A fresh pass from the relay. Throws with the relay's own explanation if it refuses. */
export async function voicePass() {
  const url = await relayUrl();
  if (!url) throw new Error('no voice relay is configured for this site');
  const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}', signal: AbortSignal.timeout(10000) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.value) throw new Error('the voice relay refused: ' + (data.error || res.status));
  return data.value;
}
