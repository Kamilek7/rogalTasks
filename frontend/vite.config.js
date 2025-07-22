import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
		cors: {
			origin: ['http://tasks.rogalrogalrogalrogal.online', 'http://localhost:5173'],
			methods: ['GET', 'POST'],
			allowedHeaders: ['Content-Type']
		},
		allowedHosts: ['rogalrogalrogalrogal.omline', 'tasks.rogalrogalrogalrogal.online'] //added this
	}
})