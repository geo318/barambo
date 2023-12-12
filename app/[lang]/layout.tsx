import '../globals.css'
import type { Metadata } from 'next'
import { FbChat, Footer, Navbar } from '/components'
import { Locale } from '/types'
import { getDictionary } from '/lib'
import { locales, routes } from '/config'
import { headers } from 'next/headers'
import { Suspense } from 'react'

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
      <Suspense>
        <Navbar lang={lang} text={shared.header} />
      </Suspense>
      {children}
      <FbChat />
      <Footer text={shared.footer} lang={lang} />
    </>
  )
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}
