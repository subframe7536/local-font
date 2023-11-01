import { defineConfig } from 'tsup'

export default defineConfig({
  dts: true,
  shims: true,
  clean: true,
  format: ['esm', 'cjs'],
  entry: [
    'src/index.ts',
  ],
  external: ['vite', 'esbuild'],
  outDir: 'dist',
})
