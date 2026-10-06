import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const chatRemoteUrl = env.VITE_CHAT_REMOTE_URL || 'https://agrosmart-insights-49vi4ufmq-21lenns-projects.vercel.app/assets/remoteEntry.js'
  const monitoreoRemoteUrl = env.VITE_MONITOREO_REMOTE_URL || 'https://agrosmart-insights-nap8-2s8tqv4lu-21lenns-projects.vercel.app/assets/remoteEntry.js'
  const mercadosRemoteUrl = env.VITE_MERCADOS_REMOTE_URL || 'https://agrosmart-insights-rg6m.vercel.app/assets/remoteEntry.js'

  return {
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: 'shell',
        remotes: {
          chat: chatRemoteUrl,
          monitoreo: monitoreoRemoteUrl,
          mercados: mercadosRemoteUrl,
        },
        shared: ['react', 'react-dom'],
      }),
    ],
    build: {
      // esnext para compatibilidad con top-level await de Module Federation
      target: 'esnext',
    },
  }
})

