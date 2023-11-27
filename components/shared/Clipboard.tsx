'use client'

import { useState } from 'react'

export const Clipboard = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false)
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }
  return (
    <button
      onClick={copyToClipboard}
      className='text-sm text-blue-600 hover:text-gray-900'
    >
      {isCopied ? 'Copied  👍' : 'Copy Link'}
    </button>
  )
}
