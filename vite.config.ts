import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // ここはViteのビルド用
  base: '/popn_random_selector_2/',
  test: { // Vitestの設定
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true, // `describe`, `it` などをグローバルに利用可能にする
  },
})
