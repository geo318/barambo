import Image from 'next/image'
import Link from 'next/link'
import { Logo, SignOut } from '/components'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Link
        href='/'
        className='flex justify-center items-center py-5 w-full bg-app-blue'
      >
        <Logo />
        <SignOut />
      </Link>
      <main className='text-black bg-white md:px-20 px-5 py-5 mx-auto'>
        {children}
      </main>
    </>
  )
}
