import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import { globSync } from 'node:fs';
import { resolve } from 'node:path';
export default defineConfig({ plugins: [react(), tailwind()], build: { rollupOptions: { input: [resolve('index.html'), ...globSync('{es,en}/**/index.html').map((file) => resolve(file))] } } });
