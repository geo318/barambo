import { locales } from '/config'
import { getDictionary } from '/lib'
import { z } from 'zod'
import { contactSchema, emailSchema } from '/schema'

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export type Locale = (typeof locales)[number]

export type Translation = Awaited<ReturnType<typeof getDictionary>>
export type HomeText = Translation['home']
export type SharedText = Translation['shared']
export type Certificate = HomeText['certificates']
export type Export = HomeText['export']
export type BlogText = Translation['blog']
export type Excursion = Translation['excursion']
export type Contact = Translation['contact']

export type PageProps = { params: { lang: Locale } }
export type EmailForm = z.infer<typeof emailSchema>
export type ContactForm = z.infer<typeof contactSchema>

export type FormAction = (
  formData: FormData
) => Promise<{ success?: boolean | string; error?: string }>

export type Entries<T extends Record<string, any>> = [keyof T, T[keyof T]][]
