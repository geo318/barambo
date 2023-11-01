'use client'

import { getBlurImage } from '/utils'
import { useEffect, useState } from 'react'

export const useBlurBase64 = (path: string) => {
  const imageUrl = getBlurImage(path)
  const sampleImage =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAAEklEQVR42mJ0jwABYGBgYGAAHpAAEI/RAfaS8QAAAAASUVORK5CYII='
  const [base64Image, setBase64Image] = useState(sampleImage)

  useEffect(() => {
    if (!imageUrl) return
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader()
        reader.onload = () => {
          const base64String = reader.result
          setBase64Image(base64String as string)
        }
        reader.readAsDataURL(blob)
      })
  }, [imageUrl])

  return { base64Image }
}
