import '../globals.css'
import type { Metadata } from 'next'
import { Mukta } from 'next/font/google'
import { Footer, Navbar } from '/components'
import { Locale } from '/types'
import { getDictionary } from '/lib'

const mukta = Mukta({ weight: ['400', '500'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
    <html lang='en'>
      <body className={mukta.className}>
        <Navbar lang={lang} text={shared.header} />
        {children}
        <Footer text={shared.footer} lang={lang} />
      </body>
    </html>
  )
}
