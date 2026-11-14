// Loads backend/.env into process.env. Imported first by every entry point, so starting the
// backend does not depend on a Node version new enough to have --env-file-if-exists.
// Variables already set in the shell win.
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const major = Number(process.versions.node.split('.')[0]);
if (major < 18) {
  console.error(`Simulacra needs Node.js 18 or newer (20+ recommended). This is ${process.versions.node}. Install a current one from https://nodejs.org and try again.`);
  process.exit(1);
}

const file = join(dirname(fileURLToPath(import.meta.url)), '..', '.env');
if (existsSync(file)) {
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
    if (!m || line.trimStart().startsWith('#')) continue;
    let value = m[2];
    if (/^(["']).*\1$/.test(value)) value = value.slice(1, -1);
    else value = value.replace(/\s+#.*$/, '');
    if (value !== '' && process.env[m[1]] === undefined) process.env[m[1]] = value;
  }
}
