'use server'

import { revalidatePath } from 'next/cache'
import { category, db, subCategory } from '/server'
import { Category, SubCategory } from '/types'
import { getFormValues, writeFile } from '/utils'
import sharp from 'sharp'

export const createMainCategory = async (formData: FormData) => {
  const [mapped, file] = getFormValues<Category>(formData)

  if (!file) return new Response('file not uploaded')
  const buffer = Buffer.from(await file[0].arrayBuffer())

  try {
    const { path } = await writeFile(file, buffer, sharp(buffer))
    await db.insert(category).values({ ...mapped, thumbnail: path })
    revalidatePath('/admin/categories')
  } catch (e) {
    console.log(e)
  }
}

export const createSubCategory = async (formData: FormData) => {
  const [mapped, file] = getFormValues<SubCategory>(formData)

  const categoryIds = Object.entries(mapped).reduce(
    (acc, [key, val], i) =>
      key.includes('cat') ? (acc += `${i <= 1 ? '' : ','}${val}`) : acc,
    ''
  )

  if (!file) return new Response('file not uploaded')
  const buffer = Buffer.from(await file[0].arrayBuffer())
  try {
    const { path } = await writeFile(file, buffer, sharp(buffer))

    await db
      .insert(subCategory)
      .values({ ...mapped, thumbnail: path, categoryIds })
    revalidatePath('/admin/categories')
  } catch (e) {
    console.log(e)
  }
}

export const getCategories = async () => await db.select().from(category)

export const getSubCategories = async () => await db.select().from(subCategory)
