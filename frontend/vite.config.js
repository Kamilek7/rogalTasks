import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
		cors: {
			origin: ['http://tasks.rogalrogalrogalrogal.online', 'http://localhost:5173'],
			methods: ['GET', 'POST'],
			allowedHeaders: ['Content-Type']
		},
		allowedHosts: ['rogalrogalrogalrogal.online', 'tasks.rogalrogalrogalrogal.online'] //added this
	}
})
