'use server'

import sharp from 'sharp'
import { generateFileName } from '/utils'
import { staticPath, imagePaths } from '/config'
import fs from 'fs'

export const writeFile = async (files: Blob[], size = 800) => {
  const file = files[0]
  const buffer = Buffer.from(await file.arrayBuffer())
  const [publicDir, staticDir] = staticPath.split(/\//)
  const [filePath, blurPath] = [...imagePaths].map(
    (p) => `/${staticDir}${p}/${generateFileName('file.name')}`
  )

  imagePaths.forEach((p) => {
    const dir = `./${staticPath}${p}` as const
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
  })

  // if (!file.type.includes('svg')) {
  //   const sharpBuffer = sharp(buffer)

  //   sharpBuffer
  //     .resize(size, size, { fit: 'cover' })
  //     .toFile(`${publicDir}${filePath}`)

  //   sharpBuffer
  //     .resize(20, 20, { fit: 'cover' })
  //     .toFile(`${publicDir}${blurPath}`)
  // }
  //how to save original file using fs ?
  fs.writeFile(`${publicDir}${filePath}`, buffer, (err) => {
    if (err) console.log(err)
  })

  const path = filePath.split(/\//).pop()
  return { path: `${imagePaths[0]}/${path}` }
}
