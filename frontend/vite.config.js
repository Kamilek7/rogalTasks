import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
	tailwindcss(),
	legacy({
		targets: ['Android >= 4.4'],
		additionalLegacyPolyfills: ['regenerator-runtime/runtime']
		})],
	build: {minify: false, sourcemap:true},
  server: {
		cors: {
			origin: ['http://tasks.rogalrogalrogalrogal.online', 'http://localhost:5173', "http://192.168.1.101"],
			methods: ['GET', 'POST'],
			allowedHeaders: ['Content-Type']
		},
		allowedHosts: ['rogalrogalrogalrogal.online', 'tasks.rogalrogalrogalrogal.online', "192.168.1.101"]
	}
})
