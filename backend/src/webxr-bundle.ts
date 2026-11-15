// How the WebXR client is bundled, shared by the backend (which bundles on first request) and
// the static-site build. The client includes the backend's own session code so the hosted page
// can run without a backend; the aliases swap its few Node-only imports for browser stand-ins.
import type { BuildOptions } from 'esbuild';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
export const WEBXR_DIR = join(HERE, '..', '..', 'webxr');
export const AVATAR_DIR = join(HERE, '..', '..', 'packages', 'com.simulacra.core', 'Avatar', 'Rocketbox');

export function webxrBuild(entry: string): BuildOptions {
  const shim = (name: string) => join(WEBXR_DIR, 'shims', name);
  return {
    entryPoints: [join(WEBXR_DIR, entry)],
    bundle: true,
    format: 'esm',
    target: 'es2020',
    platform: 'browser',
    minify: true,
    nodePaths: [join(HERE, '..', 'node_modules')],
    alias: { 'node:fs': shim('fs.js'), 'node:path': shim('path.js'), ws: shim('ws.js') },
    inject: [shim('buffer.js')],
    logLevel: 'silent',
  };
}
