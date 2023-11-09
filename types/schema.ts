import { z } from 'zod'
import { category, product, subCategory } from '/server'
import { createInsertSchema } from 'drizzle-zod'

export const insertCategorySchema = createInsertSchema(category)
export const insertSubCategorySchema = createInsertSchema(subCategory)
export const insertProductSchema = createInsertSchema(product)

export type Category = z.infer<typeof insertCategorySchema>
export type SubCategory = z.infer<typeof insertSubCategorySchema>
export type Product = z.infer<typeof insertProductSchema>
