'use server'

import { Sharp } from 'sharp'
import { staticPath, imagePaths } from '/config'
import fs from 'fs'

type Options = {
  fit?: 'fill' | 'cover' | 'contain' | 'inside' | 'outside'
  width?: number
  height?: number
}

export const writeFile = async (
  files: (File | undefined)[],
  buffer: Buffer,
  sharpBuffer: Sharp,
  options?: Options
) => {
  const { fit, height, width } = options ?? {}
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
    await sharpBuffer
      .resize(width, height ?? null, { fit })
      .toFile(`${publicDir}${filePath}`)

    await sharpBuffer
      .resize(20, height ? Math.floor(height * (20 / (width ?? 1))) : null, {
        fit,
      })
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
