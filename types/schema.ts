import { z } from 'zod'
import { category, subCategory } from '/server'
import { createInsertSchema } from 'drizzle-zod'

export const insertCategorySchema = createInsertSchema(category)
export const insertSubCategorySchema = createInsertSchema(subCategory)
export type Category = z.infer<typeof insertCategorySchema>
export type SubCategory = z.infer<typeof insertSubCategorySchema>
