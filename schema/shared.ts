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
  .refine((file) => file[0]?.size <= MAX_SIZE, 'image must be less than 5mb')
  .refine((file) => MIME_TYPES.includes(file[0]?.type), 'incorrect file type')

export const imgSchema = imgSchemaArray.transform((file) => file[0])

export const categorySchema = z.object({
  name_eng: z.string().min(3).max(20),
  name_geo: z.string().min(3).max(20),
  order: z.coerce.number().int().min(0),
  thumbnail: imgSchema,
})

export const subCategorySchema = categorySchema.extend({
  categoryId: z.coerce.number().min(0),
})

export const productSchema = z.object({
  title_eng: z.string().min(3).max(20),
  title_geo: z.string().min(3).max(20),
  desc_eng: z.string().min(3).max(500),
  desc_geo: z.string().min(3).max(500),
  categoryIds: z.string().min(1).max(10),
  thumbnail: imgSchema,
  order: z.coerce.number().int().min(0).optional(),
})
