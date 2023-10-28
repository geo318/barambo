import {
  sqliteTable,
  text,
  int,
  index,
  integer,
  numeric,
  blob,
  primaryKey,
} from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
  id: int('id').primaryKey(),
  fullName: text('full_name'),
  phone: integer('phone'),
})

export const post = sqliteTable('post', {
  id: int('id').primaryKey(),
  title: text('title'),
  likes: int('likes'),
  userId: int('userId'),
})
