import { Aside } from '/components'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='relative'>
      <Aside />
      <main className='text-black bg-white md:px-20 px-5 py-5 mt-16 ml-[15rem] mx-auto'>
        {children}
      </main>
    </div>
  )
}
