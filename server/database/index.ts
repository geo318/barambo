import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from '/server/database/schema'
import * as relations from '/server/database/relations'

const sqlite = new Database('./server/database/db/sqlite.db')
export const db = drizzle(sqlite, { schema: { ...schema, ...relations } })

export * from './schema'
