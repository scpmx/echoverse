import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import options from '@peerbit/vite'

export default defineConfig({
	plugins: [ sveltekit(), options() ],
	optimizeDeps: {
		esbuildOptions: {
		  target: 'esnext'
		}
	},
	build: {
		target: 'esnext'
	}
});
