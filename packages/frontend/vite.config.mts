import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // depending on your application, base can also be "/"
  // base: '',
  plugins: [react(), viteTsconfigPaths()],
  define: {
    global: 'window'
  },
  resolve: {
    alias: [
      // { find: '', replacement: path.resolve(__dirname, 'src') },
      // {
      //   find: /^~(.+)/,
      //   replacement: path.join(process.cwd(), 'node_modules/$1')
      // },
      // {
      //   find: /^src(.+)/,
      //   replacement: path.join(process.cwd(), 'src/$1')
      // }
      // {
      //   find: 'assets',
      //   replacement: path.join(process.cwd(), 'src/assets')
      // },
    ]
  },
  server: {
    open: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
