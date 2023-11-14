import { relations } from 'drizzle-orm'
import { category, subCategory } from '/server'

export const categories = relations(category, ({ many }) => ({
  subCategories: many(subCategory),
}))
