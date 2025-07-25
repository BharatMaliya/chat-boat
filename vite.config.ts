import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    assetsInlineLimit: 10000, // 10kb
    rollupOptions: {
      output: {
        entryFileNames: 'chatboat-widget.js',
        assetFileNames: 'chatboat-widget.[ext]'
      }
    }
  }
})
