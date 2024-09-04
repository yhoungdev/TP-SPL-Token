import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import nodePolyfills from 'vite-plugin-node-stdlib-browser'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      stream: 'stream-browserify',
      crypto: 'crypto-browserify',
    },
  },
})
