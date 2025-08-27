import { defineConfig } from 'vitest/config'
import * as fs from 'node:fs'
import * as path from 'node:path'
import dotenv from 'dotenv'

// Load .env.local if present
const envLocalPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath })
}

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    reporters: 'default',
    coverage: {
      provider: 'v8',
    },
    hookTimeout: 30000,
    testTimeout: 30000,
  },
}) 