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

export const category = sqliteTable('category', {
  id: int('id').primaryKey(),
  name_eng: text('name_eng').notNull().unique(),
  name_geo: text('name_geo').notNull().unique(),
  order: integer('order').$defaultFn(() => 0),
  thumbnail: text('thumbnail').notNull(),
})

export const subCategory = sqliteTable('subCategory', {
  id: int('id').primaryKey(),
  name_eng: text('name_eng').notNull().unique(),
  name_geo: text('name_geo').notNull().unique(),
  categoryId: int('categoryId')
    .references(() => category.id)
    .notNull(),
  order: integer('order').$defaultFn(() => 0),
  thumbnail: text('thumbnail').notNull(),
})

export const product = sqliteTable('product', {
  id: int('id').primaryKey(),
  title_eng: text('title_eng').notNull().unique(),
  title_geo: text('title_geo').notNull().unique(),
  desc_eng: text('desc_eng').notNull().unique(),
  desc_geo: text('desc_geo').notNull().unique(),
  categoryIds: text('categoryIds').notNull(),
  order: integer('order').$defaultFn(() => 0),
  thumbnail: text('thumbnail').notNull(),
})
