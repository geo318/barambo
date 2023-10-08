import { locales } from '/config'
import { getDictionary } from '/lib'
import { z } from 'zod'
import { emailSchema } from '/schema'

export type Locale = (typeof locales)[number]

export type Translation = Awaited<ReturnType<typeof getDictionary>>
export type HomeText = Translation['home']
export type SharedText = Translation['shared']
export type Certificate = HomeText['certificates']

export type PageProps = { params: { lang: Locale } }
export type EmailForm = z.infer<typeof emailSchema>
