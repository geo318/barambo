'use server'

import { Sharp, SharpOptions } from 'sharp'
import { staticPath, imagePaths } from '/config'
import fs from 'fs'

export const writeFile = async (
  files: (File | undefined)[],
  buffer: Buffer,
  sharpBuffer: Sharp,
  fit:
    | 'fill'
    | 'cover'
    | 'contain'
    | 'inside'
    | 'outside'
    | undefined = 'cover',
  width: number | undefined = 800,
  height: number | undefined | null = 800
) => {
  const file = files[0]
  if (!file) throw { error: 'file not uploaded' }
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
      .resize(width, height ?? undefined, { fit, withoutReduction: true })
      .toFile(`${publicDir}${filePath}`)
    sharpBuffer
      .resize(20, 20, { fit, withoutReduction: true })
      .toFile(`${publicDir}${blurPath}`)
  } else
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
