import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import peerbit from '@peerbit/vite'

export default defineConfig({
	plugins: [ sveltekit(), peerbit() ],
	optimizeDeps: {
		esbuildOptions: {
		  target: 'esnext'
		}
	},
	build: {
		target: 'esnext'
	}
})
