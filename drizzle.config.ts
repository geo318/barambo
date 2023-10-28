import type { Config } from 'drizzle-kit'

export default {
  schema: './server/database/schema.ts',
  out: './server/database/db',
  driver: 'better-sqlite',
  dbCredentials: {
    url: './server/database/db/sqlite.db',
  },
  breakpoints: true,
} satisfies Config
