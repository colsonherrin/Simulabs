// Browser stand-in for the few file calls the backend's memory uses: "files" are localStorage entries.
const key = (p) => 'simulacra.file:' + p;
export function existsSync(p) { try { return localStorage.getItem(key(p)) !== null; } catch (e) { return false; } }
export function readFileSync(p) { const v = localStorage.getItem(key(p)); if (v === null) throw new Error('not found: ' + p); return v; }
export function writeFileSync(p, text) { try { localStorage.setItem(key(p), String(text)); } catch (e) { /* storage full or blocked: memory lasts for this visit only */ } }
export function mkdirSync() {}
