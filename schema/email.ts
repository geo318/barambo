import { z } from 'zod'
import { imgSchema } from './shared'

export const emailSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  last_name: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z
    .string()
    .min(8, { message: 'Phone number must be at least 8 characters long' }),
  personal_id: z
    .string()
    .min(2, { message: 'Personal id must be at least 2 characters long' }),
  address: z
    .string()
    .min(2, { message: 'Address must be at least 2 characters long' }),
  message: z.string().optional(),
  id_image_facing_front: imgSchema,
  id_image_facing_back: imgSchema,
  your_selfie_while_holding_id: imgSchema,
})
