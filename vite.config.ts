import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // 세 번째 인자를 '' 로 두면 VITE_ 접두사 외의 env(VITE_PORT 등)도 읽는다.
  const env = loadEnv(mode, process.cwd(), '')
  const port = Number(env.VITE_PORT) || 5173

  return {
    plugins: [react()],
    server: {
      port,
      host: true,
    },
    preview: {
      port,
    },
  }
})
