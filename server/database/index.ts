import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

const sqlite = new Database(`${process.env.DB_PATH}/db/sqlite.db`)
export const db = drizzle(sqlite)
