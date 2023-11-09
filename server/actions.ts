'use server'

import { revalidatePath } from 'next/cache'
import { category, db, product, subCategory } from '/server'
import { Category, Product, SubCategory } from '/types'
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

  if (!file) throw { error: 'file not uploaded' }
  const buffer = Buffer.from(await file[0].arrayBuffer())
  try {
    const { path } = await writeFile(file, buffer, sharp(buffer))

    await db.insert(subCategory).values({ ...mapped, thumbnail: path })

    revalidatePath('/admin/subcategories')
    return { success: true }
  } catch (e) {
    return {
      error: 'category already exists or something went wrong',
    }
  }
}

export const getCategories = async () => await db.select().from(category)

export const getSubCategories = async () => await db.select().from(subCategory)

export const getProducts = async () => await db.select().from(product)

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
        ...values,
        ...(thumbnail ? { thumbnail } : {}),
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

export const createProduct = async (formData: FormData) => {
  const [mapped, file] = getFormValues<Product>(formData)

  if (!file) throw { error: 'file not uploaded' }
  const buffer = Buffer.from(await file[0].arrayBuffer())
  try {
    const { path } = await writeFile(file, buffer, sharp(buffer))

    await db.insert(product).values({ ...mapped, thumbnail: path })

    revalidatePath('/admin/products')
    return { success: 'Product added' }
  } catch (e) {
    return {
      error: 'product already exists or something went wrong',
    }
  }
}

export const editProduct = async (formData: FormData) => {
  const [values, file] = getFormValues<Product>(formData)

  const buffer = file.length && Buffer.from(await file[0].arrayBuffer())
  let thumbnail: string = ''

  try {
    if (buffer && buffer.toString()) {
      const { path } = await writeFile(file, buffer, sharp(buffer))
      thumbnail = path
    }

    await db
      .update(product)
      .set({
        ...values,
        ...(thumbnail ? { thumbnail } : {}),
      })
      .where(eq(subCategory.id, Number(formData.get('id'))))

    revalidatePath('/admin/products')
    return { success: true }
  } catch (e) {
    console.log(e)
    return {
      error: 'category already exists or something went wrong',
    }
  }
}

export const deleteProduct = async (formData: FormData) => {
  try {
    await db
      .delete(product)
      .where(eq(subCategory.id, Number(formData.get('id'))))

    revalidatePath('/admin/products')
    return { success: 'deleted' }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}
