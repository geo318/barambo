import { locales } from '/config'
import { getDictionary } from '/lib'
import { z } from 'zod'
import { contactSchema, excursionSchema } from '/schema'

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
export type Addresses = Contact['addresses']['secondary']
export type Switcher = Translation['blog']['switcher']

export type PageProps = { params: { lang: Locale } }
export type EmailForm = z.infer<typeof excursionSchema>
export type ContactForm = z.infer<typeof contactSchema>

export type FormAction = (
  formData: FormData
) => Promise<{
  success?: boolean | string | number
  error?: string | boolean | number
}>

export type Entries<T extends Record<string, any>> = [keyof T, T[keyof T]][]
export type FormValues = Record<
  string,
  string | number | Blob | undefined | null
>

export type Blog = 'news' | 'recept' | 'csr'
