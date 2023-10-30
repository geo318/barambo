'use server'

import { revalidatePath } from 'next/cache'
import { category, db, subCategory } from '.'
import { Category, SubCategory } from '/types'
import { getFormValues, writeFile } from '/utils'

export const createMainCategory = async (formData: FormData) => {
  const [mapped, file] = getFormValues<Category>(formData)

  if (!file) return new Response('file not uploaded')

  try {
    const { path } = await writeFile(file)
    await db.insert(category).values({ ...mapped, thumbnail: path })
    revalidatePath('/admin/categories')
  } catch (e) {
    console.log(e)
  }
}

export const createSubCategory = async (formData: FormData) => {
  const [mapped, file] = getFormValues<SubCategory>(formData)

  const categoryIds = Object.entries(mapped).reduce((acc, [key, val], i) => {
    return key.includes('cat') ? (acc += `${i <= 1 ? '' : ','}${val}`) : acc
  }, '')

  if (!file) return new Response('file not uploaded')

  try {
    const { path } = await writeFile(file)
    await db
      .insert(subCategory)
      .values({ ...mapped, thumbnail: path, categoryIds })
    revalidatePath('/admin/categories')
  } catch (e) {
    console.log(e)
  }
}

export const getCategories = async () => await db.select().from(category)
