import { StaticImageData } from 'next/image'

export type ArcProps = {
  src: StaticImageData
  heading?: string
  sub?: string
  className?: string
  arch?: StaticImageData
  imgClassName?: string
}
