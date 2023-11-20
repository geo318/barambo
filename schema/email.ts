import { z } from 'zod'

export const emailSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  phone: z
    .string()
    .min(8, { message: 'Phone number must be at least 8 characters long' }),
  school: z
    .string()
    .min(2, { message: 'School id must be at least 2 characters long' }),
  file: z
    .any()
    .or(z.custom<FileList>())
    .transform((file) => file?.[0]),
  class: z
    .string()
    .min(1, { message: 'Class must be at least 2 characters long' }),
  description: z.string().optional(),
})

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  last_name: z
    .string()
    .min(2, { message: 'Phone number must be at least 8 characters long' }),
  phone: z
    .string()
    .min(8, { message: 'School id must be at least 2 characters long' }),
  email: z.string().email({ message: 'Email must be a valid email' }),
  subject: z.enum(['general', 'products', 'export', 'excursion', 'other ']),
  description: z.string().optional(),
})
