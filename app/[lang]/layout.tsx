import '../globals.css'
import type { Metadata } from 'next'
import { Footer, Navbar } from '/components'
import { Locale } from '/types'
import { getDictionary } from '/lib'
import { locales } from '/config'

export const metadata: Metadata = {
  title: 'Barambo',
  description: 'Chocolates and sweets manufacturer',
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const { shared } = await getDictionary(lang)
  return (
    <>
      <Navbar lang={lang} text={shared.header} />
      {children}
      <Footer text={shared.footer} lang={lang} />
    </>
  )
}

// export function generateStaticParams() {
//   return locales.map((lang) => ({ lang }))
// }
