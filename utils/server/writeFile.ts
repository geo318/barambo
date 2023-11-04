'use server'

import { Sharp, SharpOptions } from 'sharp'
import { staticPath, imagePaths } from '/config'
import fs from 'fs'

/*
  @params files - files: Blob[],
  @params buffer - Buffer.from(await file.arrayBuffer())
  @params size - size = 800
  @params sharpBuffer - sharp(buffer)
*/

export const writeFile = async (
  files: File[],
  buffer: Buffer,
  sharpBuffer: Sharp,
  size: number | undefined = 800
) => {
  const file = files[0]
  const [publicDir, staticDir] = staticPath.split(/\//)
  const [filePath, blurPath] = [...imagePaths].map(
    (p) => `/${staticDir}${p}/${generateFileName(file.name)}`
  )

  imagePaths.forEach((p) => {
    const dir = `./${staticPath}${p}` as const
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
  })

  if (!file.type.includes('svg')) {
    sharpBuffer
      .resize(size, size, { fit: 'cover' })
      .toFile(`${publicDir}${filePath}`)

    sharpBuffer
      .resize(20, 20, { fit: 'cover' })
      .toFile(`${publicDir}${blurPath}`)
  }

  fs.writeFile(`${publicDir}${filePath}`, buffer, (err) => {
    if (err) console.log(err)
  })

  const path = filePath.split(/\//).pop()
  return { path: `${imagePaths[0]}/${path}` }
}

function generateFileName(fileName: string) {
  const [name, ext] = fileName
    .trim()
    .replace(/\//g, '-')
    .toLocaleLowerCase()
    .split('.')
  const dateString = new Date()
    .toISOString()
    .toLocaleLowerCase()
    .replace(/[:.T-]/g, '')

  return `${name.trim().replace(/ /g, '-')}-${dateString}.${ext}`
}
