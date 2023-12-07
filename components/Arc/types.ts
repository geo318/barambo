import { StaticImageData } from 'next/image'

export type ArcProps = {
  src: StaticImageData | string
  heading?: string
  sub?: string
  className?: string
  arch?: StaticImageData | string
  imgClassName?: string
}
