'use server'

import { revalidatePath } from 'next/cache'
import { category, db, subCategory } from '/server'
import { Category, SubCategory } from '/types'
import { getFormValues, writeFile } from '/utils'
import { eq } from 'drizzle-orm'
import sharp from 'sharp'

export const createMainCategory = async (formData: FormData) => {
  const [mapped, file] = getFormValues<Category>(formData)

  if (!file) throw { error: 'file not uploaded' }
  const buffer = Buffer.from(await file[0].arrayBuffer())

  try {
    const { path } = await writeFile(file, buffer, sharp(buffer))
    await db.insert(category).values({ ...mapped, thumbnail: path })
    revalidatePath('/admin/categories')
    return { success: true }
  } catch (e) {
    return {
      error: 'category already exists or something went wrong',
    }
  }
}

export const createSubCategory = async (formData: FormData) => {
  const [mapped, file] = getFormValues<SubCategory>(formData)

  const categoryIds = Object.entries(mapped).reduce(
    (acc, [key, val], i) =>
      key.includes('cat') ? (acc += `${i <= 1 ? '' : ','}${val}`) : acc,
    ''
  )

  if (!file) throw { error: 'file not uploaded' }
  const buffer = Buffer.from(await file[0].arrayBuffer())
  try {
    const { path } = await writeFile(file, buffer, sharp(buffer))

    await db
      .insert(subCategory)
      .values({ ...mapped, thumbnail: path, categoryIds })

    revalidatePath('/admin/categories')
    return { success: true }
  } catch (e) {
    return {
      error: 'category already exists or something went wrong',
    }
  }
}

export const getCategories = async () => await db.select().from(category)

export const getSubCategories = async () => await db.select().from(subCategory)

export const editCategory = async (formData: FormData) => {
  const [values, file] = getFormValues<Category>(formData)
  const buffer = file.length && Buffer.from(await file[0].arrayBuffer())

  let thumbnail: string = ''

  try {
    if (buffer && buffer.toString()) {
      const { path } = await writeFile(file, buffer, sharp(buffer))
      thumbnail = path
    }

    await db
      .update(category)
      .set({ ...values, ...(thumbnail ? { thumbnail } : {}) })
      .where(eq(category.id, Number(formData.get('id'))))

    revalidatePath('/admin/categories')
    return { success: true }
  } catch (e) {
    return {
      error: 'category already exists or something went wrong',
    }
  }
}

export const editSubCategory = async (formData: FormData) => {
  const [values, file] = getFormValues<Category>(formData)
  const filteredValues: Partial<Category> = Object.entries(values).reduce(
    (acc, [key, val]) => (!key.includes('cat') ? { ...acc, [key]: val } : acc),
    {}
  )

  const categoryIds = Object.entries(values).reduce(
    (acc, [key, val], i) =>
      key.includes('cat') ? (acc += `${i <= 1 ? '' : ','}${val}`) : acc,
    ''
  )
  const buffer = file.length && Buffer.from(await file[0].arrayBuffer())
  let thumbnail: string = ''

  try {
    if (buffer && buffer.toString()) {
      const { path } = await writeFile(file, buffer, sharp(buffer))
      thumbnail = path
    }

    await db
      .update(subCategory)
      .set({
        ...filteredValues,
        ...(thumbnail ? { thumbnail } : {}),
        categoryIds,
      })
      .where(eq(subCategory.id, Number(formData.get('id'))))

    revalidatePath('/admin/subcategories')
    return { success: true }
  } catch (e) {
    console.log(e)
    return {
      error: 'category already exists or something went wrong',
    }
  }
}

export const deleteSubcategory = async (formData: FormData) => {
  try {
    await db
      .delete(subCategory)
      .where(eq(subCategory.id, Number(formData.get('id'))))

    revalidatePath('/admin/subcategories')
    return { success: 'deleted' }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}

export const deleteCategory = async (formData: FormData) => {
  try {
    await db.delete(category).where(eq(category.id, Number(formData.get('id'))))

    revalidatePath('/admin/subcategories')
    return { success: 'deleted' }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}
