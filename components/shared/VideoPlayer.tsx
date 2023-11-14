'use client'

import { useState } from 'react'
import ReactPlayer from 'react-player'
import { twMerge } from 'tailwind-merge'

export const VideoPlayer = ({ link }: { link: string }) => {
  const [isPlayerLoading, setIsPlayerLoading] = useState<boolean>(true)

  return (
    <div className='flex w-full h-full justify-center items-center'>
      {isPlayerLoading && (
        <div className='w-full h-full justify-center items-center aspect-5/3 bg-slate-100 animate-pulse rounded-2xl' />
      )}
      <div
        className={twMerge(
          'w-full h-full justify-center items-center aspect-5/3',
          isPlayerLoading ? 'hidden' : 'flex'
        )}
      >
        <ReactPlayer
          url={link}
          controls
          width={'100%'}
          height={'100%'}
          style={{
            borderRadius: '1rem',
            overflow: 'hidden',
            minHeight: '100%',
          }}
          onReady={() => setIsPlayerLoading(false)}
        />
      </div>
    </div>
  )
}
