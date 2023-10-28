'use server'

import { category, db } from '.'
import { Category } from '/types'
import { getFormValues, writeFile } from '/utils'

export const create = async (formData: FormData) => {
  const [mapped, file] = getFormValues<Category>(formData)

  if (!file) return new Response('file not uploaded')

  try {
    const { path } = await writeFile(file)
    await db.insert(category).values({ ...mapped, thumbnail: path })
  } catch (e) {
    console.log(e)
  }
}

export const getCategories = async () => await db.select().from(category)
