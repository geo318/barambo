import { Aside, SignOut } from '/components'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='relative'>
      <div className='fixed top-0 inset-x-0 w-full flex justify-end px-10 py-5'>
        <SignOut />
      </div>
      <Aside className='' />
      <main className='text-black bg-white md:px-20 px-5 py-5 mt-16 ml-[15rem] mx-auto'>
        {children}
      </main>
    </div>
  )
}
