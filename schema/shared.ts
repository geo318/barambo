import z from 'zod'

const MAX_SIZE = 5 * 1024 * 1024
const MIME_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']

export const imgSchemaArray = z
  .custom<FileList>()
  .refine((file: FileList) => file?.length, 'please, select an image')
  .refine((file) => file[0]?.size <= MAX_SIZE, 'image must be less than 5mb')
  .refine((file) => MIME_TYPES.includes(file[0]?.type), 'incorrect file type')

export const imgSchema = imgSchemaArray.transform((file) => file[0])
