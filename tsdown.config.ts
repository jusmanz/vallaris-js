import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  sourcemap: true,
  clean: true,
  format: ['esm', 'cjs'],
  outDir: 'dist',
  esbuild: {
    target: 'es2020'
  },
  splitting: false,
  minify: false,
  // keep filenames compatible with current package.json
  outExtension: ({ format }) => ({
    js: format === 'esm' ? '.mjs' : '.cjs'
  }),
}) 