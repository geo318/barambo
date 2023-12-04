import { z } from 'zod'
import {
  category,
  certificate,
  discover,
  headline,
  homeCategory,
  post,
  product,
  slider,
  subCategory,
} from '/server'
import { createInsertSchema } from 'drizzle-zod'

export const insertCategorySchema = createInsertSchema(category)
export const insertSubCategorySchema = createInsertSchema(subCategory)
export const insertProductSchema = createInsertSchema(product)
export const insertPostSchema = createInsertSchema(post).transform((data) => ({
  ...data,
  type: z.enum(['news', 'recept', 'csr']).parse(data.type),
}))
export const insetSliderSchema = createInsertSchema(slider)
export const insetHeadlineSchema = createInsertSchema(headline)
export const insertCertificateSchema = createInsertSchema(certificate)
export const insertDiscoverSchema = createInsertSchema(discover)
export const insertHomeCategorySchema = createInsertSchema(homeCategory)

export type Category = z.infer<typeof insertCategorySchema>
export type SubCategory = z.infer<typeof insertSubCategorySchema>
export type Product = z.infer<typeof insertProductSchema>
export type Post = z.infer<typeof insertPostSchema>
export type Slider = z.infer<typeof insetSliderSchema>
export type Headline = z.infer<typeof insetHeadlineSchema>
export type Cert = z.infer<typeof insertCertificateSchema>
export type Discover = z.infer<typeof insertDiscoverSchema>
export type HomeCategory = z.infer<typeof insertHomeCategorySchema>
