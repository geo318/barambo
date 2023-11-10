'use client'

import { signOut } from 'next-auth/react'

export const SignOut = () => {
  return (
    <div
      className='text-blue-800 hover:underline font-semibold cursor-pointer mt-7'
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      Sign Out
    </div>
  )
}
