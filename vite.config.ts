import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: { // Vitestの設定を追加
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true, // `describe`, `it` などをグローバルに利用可能にする
  },
})
