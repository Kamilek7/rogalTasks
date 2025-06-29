import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
		cors: {
			origin: ['http://tasks.rogal-rogal.duckdns.org', 'http://localhost:5173'],
			methods: ['GET', 'POST'],
			allowedHeaders: ['Content-Type']
		},
		allowedHosts: ['rogal-rogal.duckdns.org', 'tasks.rogal-rogal.duckdns.org'] //added this
	}
})