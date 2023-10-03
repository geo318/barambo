import { locales, products } from '/config'
import { getDictionary } from '/lib'
import { z } from 'zod'
import { emailSchema } from '/schema'

export type Locale = (typeof locales)[number]
export type Product = (typeof products)[number]

export type Translation = Awaited<ReturnType<typeof getDictionary>>
export type HomeText = Translation['home']
export type SharedText = Translation['shared']
export type PageText = Translation['debit_card']
export type OrderText = Translation['order_card']
export type OrderFormText  = OrderText['form']

export type PageProps = { params: { lang: Locale } }
export type EmailForm = z.infer<typeof emailSchema>
