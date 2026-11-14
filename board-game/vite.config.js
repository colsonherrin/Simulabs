import { defineConfig } from 'vite';

export default defineConfig(async () => {
  const plugins = [];
  if (process.env.AR_HTTPS === '1') {
    const { default: basicSsl } = await import('@vitejs/plugin-basic-ssl');
    plugins.push(basicSsl());
  }
  return {
    plugins,
    server: { host: true, port: 5173 },
    preview: { host: true, port: 5173 },
  };
});
