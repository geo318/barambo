import {
  sqliteTable,
  text,
  int,
  integer,
  primaryKey,
} from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
  id: int('id').primaryKey(),
  fullName: text('full_name'),
  phone: integer('phone'),
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

export const productsToSubcategories = sqliteTable(
  'products_to_subCategories',
  {
    productId: integer('productId')
      .notNull()
      .references(() => product.id, { onDelete: 'cascade' }),
    subCategoryId: integer('subCategoryId')
      .notNull()
      .references(() => subCategory.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey(t.productId, t.subCategoryId),
  })
)

export const slider = sqliteTable('slider', {
  id: int('id').primaryKey(),
  title_eng: text('title_eng'),
  title_geo: text('title_geo'),
  order: integer('order').$defaultFn(() => 0),
  thumbnail: text('thumbnail').notNull(),
})

export const post = sqliteTable('post', {
  id: int('id').primaryKey(),
  title_eng: text('title_eng').notNull().unique(),
  title_geo: text('title_geo').notNull().unique(),
  content_eng: text('content_eng').notNull(),
  content_geo: text('content_geo').notNull(),
  type: text('type').notNull(),
  thumbnail: text('thumbnail').notNull(),
  banner: text('banner'),
  slug: text('slug').notNull().unique(),
  order: integer('order').$defaultFn(() => 0),
  link: text('link'),
})

export const headline = sqliteTable('headline', {
  id: int('id').primaryKey(),
  title_eng: text('title_eng').notNull().unique(),
  title_geo: text('title_geo').notNull().unique(),
  subtitle_eng: text('subtitle_eng').notNull(),
  subtitle_geo: text('subtitle_geo').notNull(),
  desc_eng: text('desc_eng').notNull(),
  desc_geo: text('desc_geo').notNull(),
})

export const certificate = sqliteTable('certificate', {
  id: int('id').primaryKey(),
  title_eng: text('title_eng').notNull().unique(),
  title_geo: text('title_geo').notNull().unique(),
  desc_eng: text('desc_eng').notNull().unique(),
  desc_geo: text('desc_geo').notNull().unique(),
  order: integer('order').$defaultFn(() => 0),
})

export const file = sqliteTable('file', {
  id: int('id').primaryKey(),
  name: text('name').notNull(),
  path: text('path').notNull().unique(),
})

export const discover = sqliteTable('discover', {
  id: int('id').primaryKey(),
  heading_eng: text('heading_eng').notNull().unique(),
  heading_geo: text('heading_geo').notNull().unique(),
  subheading_top_eng: text('subheading_top_eng').notNull().unique(),
  subheading_top_geo: text('subheading_top_geo').notNull().unique(),
  subheading_bottom_eng: text('subheading_bottom_eng').notNull().unique(),
  subheading_bottom_geo: text('subheading_bottom_geo').notNull().unique(),
  desc_top_eng: text('desc_top_eng').notNull().unique(),
  desc_top_geo: text('desc_top_geo').notNull().unique(),
  desc_bottom_eng: text('desc_bottom_eng').notNull().unique(),
  desc_bottom_geo: text('desc_bottom_geo').notNull().unique(),
  thumbnail: text('thumbnail').notNull(),
  background: text('background').notNull(),
  subcategoryId: int('subcategoryId').notNull(),
})

export const homeCategory = sqliteTable('home_category', {
  id: int('id').primaryKey(),
  categoryId: int('categoryId').notNull(),
  color: text('color').notNull(),
  thumbnail: text('thumbnail').notNull(),
  heading_eng: text('heading_eng').notNull().unique(),
  heading_geo: text('heading_geo').notNull().unique(),
})
