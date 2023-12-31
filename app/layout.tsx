import './globals.css'
import type { Metadata } from 'next'
import { Mukta } from 'next/font/google'
import { QueryProvider } from '/context'

const mukta = Mukta({ weight: ['400', '500'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Barambo',
  description: 'Chocolates and sweets manufacturer',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={mukta.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
