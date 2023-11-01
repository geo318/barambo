'use client'

import { signOut } from 'next-auth/react'

export const SignOut = () => {
  return (
    <div
      className='text-blue-800 hover:underline font-semibold'
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      Sign Out
    </div>
  )
}
