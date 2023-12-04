import z from 'zod'

const MAX_SIZE = 5 * 1024 * 1024
const MIME_TYPES = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
]

export const imgSchemaArray = z
  .custom<FileList>()
  .refine((file: FileList) => file?.length, 'please, select an image')
  .refine((file) => file?.[0]?.size <= MAX_SIZE, 'image must be less than 5mb')
  .refine((file) => MIME_TYPES.includes(file?.[0]?.type), 'incorrect file type')

export const imgSchema = imgSchemaArray.transform((file) => file?.[0])

export const imgSchemaOptional = z
  .custom<FileList>()
  .refine(
    (file: FileList) => file?.[0] == null || file?.length,
    'please, select an image'
  )
  .refine(
    (file) => file?.[0] == null || file?.[0]?.size <= MAX_SIZE,
    'image must be less than 5mb'
  )
  .refine(
    (file) => file?.[0] == null || MIME_TYPES.includes(file?.[0]?.type),
    'incorrect file type'
  )
  .transform((file) => file?.[0])

export const categorySchema = z.object({
  id: z.coerce.number().min(0).optional(),
  name_eng: z.string().min(3).max(20),
  name_geo: z.string().min(3).max(20),
  order: z.coerce.number().int().min(0),
  thumbnail: z.string().or(imgSchema),
})

export const subCategorySchema = categorySchema.extend({
  categoryId: z.coerce.number().min(0),
})

export const productSchema = (optional?: boolean) =>
  z.object({
    id: z.coerce.number().min(0).optional(),
    title_eng: z.string().min(3).max(200),
    title_geo: z.string().min(3).max(200),
    desc_eng: z.string().min(3).max(25000),
    desc_geo: z.string().min(3).max(25000),
    categoryIds: z.string().min(1).max(10),
    thumbnail: optional ? z.string().or(imgSchema) : imgSchema,
    order: z.coerce.number().int().min(0),
  })

export const postSchema = (optional?: boolean) =>
  z.object({
    id: z.coerce.number().min(0).optional(),
    title_eng: z.string().min(3).max(200),
    title_geo: z.string().min(3).max(200),
    content_eng: z.string().min(3).max(25000),
    content_geo: z.string().min(3).max(25000),
    thumbnail: optional ? z.string().or(imgSchema) : imgSchema,
    banner: z.string().or(imgSchemaOptional),
    type: z.enum(['news', 'recept', 'csr']),
    link: z.optional(z.string().or(z.string().url())),
    order: z.coerce.number().int().min(0),
  })

export const sliderSchema = z.object({
  id: z.coerce.number().min(0).optional(),
  thumbnail: imgSchema,
  order: z.coerce.number().int().min(0),
})

export const headlineSchema = z.object({
  id: z.coerce.number().min(0).optional(),
  title_eng: z.string().min(3).max(200),
  title_geo: z.string().min(3).max(200),
  subtitle_eng: z.string().min(3).max(200),
  subtitle_geo: z.string().min(3).max(200),
  desc_eng: z.string().min(3).max(25000),
  desc_geo: z.string().min(3).max(25000),
})

export const discoverSchema = z.object({
  id: z.coerce.number().min(0).optional(),
  heading_eng: z.string().min(3).max(200),
  heading_geo: z.string().min(3).max(200),
  subheading_top_eng: z.string().min(3).max(200),
  subheading_top_geo: z.string().min(3).max(200),
  subheading_bottom_eng: z.string().min(3).max(200),
  subheading_bottom_geo: z.string().min(3).max(200),
  desc_top_eng: z.string().min(3).max(25000),
  desc_top_geo: z.string().min(3).max(25000),
  desc_bottom_eng: z.string().min(3).max(25000),
  desc_bottom_geo: z.string().min(3).max(25000),
  thumbnail: z.string().or(imgSchema),
  background: z.string().or(imgSchema),
  subcategoryId: z.coerce.number().int().min(0),
})

export const homeCategorySchema = z.object({
  id: z.coerce.number().min(0).optional(),
  heading_eng: z.string().min(3).max(200),
  heading_geo: z.string().min(3).max(200),
  thumbnail: z.string().or(imgSchema),
  color: z.string().min(3).max(10),
  categoryId: z.coerce.number().int().min(0),
})

export const certSchema = z.object({
  id: z.coerce.number().min(0).optional(),
  title_eng: z.string().min(3).max(200),
  title_geo: z.string().min(3).max(200),
  desc_eng: z.string().min(3).max(200),
  desc_geo: z.string().min(3).max(200),
  order: z.coerce.number().int().min(0),
})
