import Image, { type ImageProps } from 'next/image'
import { twMerge } from 'tailwind-merge'

export const Img = ({ alt = '', className = '', ...props }: ImageProps) => {
  return (
    <>
      <div
        style={{ width: props.width, height: props.height }}
        className={className}
      />
      <Image
        {...props}
        alt={alt}
        className={twMerge(
          'opacity-0 transition-opacity duration-500',
          className
        )}
        onLoadingComplete={(image) => {
          image.classList.remove('opacity-0')
        }}
      />
    </>
  )
}
