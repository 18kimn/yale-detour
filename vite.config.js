import {defineConfig} from 'vite'
import compileTime from 'vite-plugin-compile-time'
import {svelte} from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), compileTime()],
})
