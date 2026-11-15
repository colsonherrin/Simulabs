export function dirname(p) { const i = String(p).lastIndexOf('/'); return i < 0 ? '.' : p.slice(0, i); }
export function join(...parts) { return parts.join('/'); }
