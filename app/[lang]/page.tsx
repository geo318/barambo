import Image from 'next/image'
import { Button } from '/components/shared'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center  p-24'>
      <Button className='w-44'>
        Read More
      </Button>
      <div className='p-5 bg-red-500 mt-[5px]'>adsads</div>
    </main>
  )
}
