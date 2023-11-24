import { relations } from 'drizzle-orm'
import {
  category,
  product,
  productsToSubcategories,
  subCategory,
} from './schema'

export const categories = relations(category, ({ many }) => ({
  subCategories: many(subCategory),
}))

export const categoryRelations = relations(category, ({ many }) => ({
  subCategories: many(subCategory),
}))

export const subCategoryRelations = relations(subCategory, ({ one, many }) => ({
  category: one(category, {
    fields: [subCategory.categoryId],
    references: [category.id],
  }),
  productsToSuCategories: many(productsToSubcategories),
}))

export const productRelations = relations(product, ({ many }) => ({
  productsToSuCategories: many(productsToSubcategories),
}))

export const usersToGroupsRelations = relations(
  productsToSubcategories,
  ({ one }) => ({
    subCategory: one(subCategory, {
      fields: [productsToSubcategories.subCategoryId],
      references: [subCategory.id],
    }),

    product: one(product, {
      fields: [productsToSubcategories.productId],
      references: [product.id],
    }),
  })
)

