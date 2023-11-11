import { z } from 'zod'
import { category, post, product, slider, subCategory } from '/server'
import { createInsertSchema } from 'drizzle-zod'

export const insertCategorySchema = createInsertSchema(category)
export const insertSubCategorySchema = createInsertSchema(subCategory)
export const insertProductSchema = createInsertSchema(product)
export const insetPostSchema = createInsertSchema(post)
export const insetSliderSchema = createInsertSchema(slider)

export type Category = z.infer<typeof insertCategorySchema>
export type SubCategory = z.infer<typeof insertSubCategorySchema>
export type Product = z.infer<typeof insertProductSchema>
export type Post = z.infer<typeof insetPostSchema>
export type Slider = z.infer<typeof insetSliderSchema>
