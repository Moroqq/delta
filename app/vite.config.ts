import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  // 127.0.0.1 явно: на Windows vite может слушать только IPv6 ::1,
  // и IPv4-клиенты (встроенный браузер, эмулятор) не достучатся
  server: { host: '127.0.0.1', port: 5199 },
});
