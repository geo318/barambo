import type { Config } from 'drizzle-kit'

export default {
  schema: `${process.env.DB_PATH}/schema.ts`,
  out: `${process.env.DB_PATH}/db`,
  driver: 'better-sqlite',
  dbCredentials: {
    url: `${process.env.DB_PATH}/db/sqlite.db`,
  },
  breakpoints: true,
} satisfies Config
