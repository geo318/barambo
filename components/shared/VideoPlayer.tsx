'use client'

import { useState } from 'react'
import ReactPlayer from 'react-player'
import { Spinner } from '.'

export const VideoPlayer = ({ link }: { link: string }) => {
  const [isPlayerLoading, setIsPlayerLoading] = useState<boolean>(true)

  return (
    <div className='flex w-full h-full justify-center items-center'>
      {isPlayerLoading && <Spinner />}
      <div
        className={`w-full h-full justify-center items-center aspect-6/5 ${
          isPlayerLoading ? 'hidden' : 'flex'
        }`}
      >
        <ReactPlayer
          url={link}
          controls
          width={'100%'}
          height={'60%'}
          style={{
            aspectRatio: '6/5',
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
