import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/chord-relationships-analyzer/',
  server: {
    port: 5173, // default port
    open: true // auto open browser
  }
})
