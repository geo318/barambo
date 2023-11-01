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
  class: z
    .string()
    .min(1, { message: 'Class must be at least 2 characters long' }),
  description: z.string().optional(),
})
