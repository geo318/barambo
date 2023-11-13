'use server'

import { revalidatePath } from 'next/cache'
import {
  category,
  certificate,
  db,
  headline,
  post,
  product,
  slider,
  subCategory,
} from '/server'
import {
  Category,
  Cert,
  Headline,
  Post,
  Product,
  Slider,
  SubCategory,
} from '/types'
import { getFormValues, writeFile } from '/utils'
import { eq } from 'drizzle-orm'
import { routes } from '/config'
import sharp from 'sharp'

export const createMainCategory = async (formData: FormData) => {
  const [mapped, file] = getFormValues<Category>(formData)

  if (!file) throw { error: 'file not uploaded' }
  const buffer = Buffer.from(await file[0].arrayBuffer())

  try {
    const { path } = await writeFile(file, buffer, sharp(buffer))
    await db.insert(category).values({ ...mapped, thumbnail: path })
    revalidatePath(routes.addCategory)
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

    revalidatePath(routes.addSubCategory)
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

export const getPosts = async () => await db.select().from(post)

export const getSlides = async () => await db.select().from(slider)

export const getHeadLines = async () => await db.select().from(headline)

export const getCertificates = async () => await db.select().from(certificate)

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

    revalidatePath(routes.addCategory)
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

    revalidatePath(routes.addSubCategory)
    return { success: true }
  } catch (e) {
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

    revalidatePath(routes.addSubCategory)
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

    revalidatePath(routes.addCategory)
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

    revalidatePath(routes.addProduct)
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
    const updateValues = {} as Partial<Product>
    ;(
      Object.entries(values) as [keyof Product, Product[keyof Product]][]
    ).forEach(([key, val]) => {
      if (val) (updateValues as Record<string, string | number>)[key] = val
    })

    await db
      .update(product)
      .set({
        ...updateValues,
        ...(thumbnail ? { thumbnail } : {}),
      })
      .where(eq(product.id, Number(formData.get('id'))))

    revalidatePath(routes.addProduct)
    return { success: true }
  } catch (e) {
    return {
      error: 'category already exists or something went wrong',
    }
  }
}

export const deleteProduct = async (formData: FormData) => {
  try {
    await db.delete(product).where(eq(product.id, Number(formData.get('id'))))

    revalidatePath(routes.addProduct)
    return { success: 'deleted' }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}

export const createPost = async (formData: FormData) => {
  const [mapped, files] = getFormValues<Post>(formData)
  const slug = mapped.title_eng.trim().replace(/\s+/g, '-').toLowerCase()
  try {
    const thumbnails: string[] = []
    if (files && files?.length)
      for (let i = 0, file = files[i]; i < files.length; i++) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const { path } = await writeFile([file], buffer, sharp(buffer))
        thumbnails.push(path)
      }

    const [thumbnail, banner] = thumbnails

    mapped.banner = banner
    mapped.thumbnail = thumbnail
    mapped.slug = slug
    await db.insert(post).values({ ...mapped })

    revalidatePath(routes.addPost)
    return { success: 'Post added' }
  } catch (e) {
    return {
      error: 'post already exists or something went wrong',
    }
  }
}

export const editPost = async (formData: FormData) => {
  const [values, files] = getFormValues<Post>(formData)

  try {
    const thumbnails: string[] = []
    if (files && files?.length)
      for (let i = 0, file = files[i]; i < files.length; i++) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const { path } = await writeFile([file], buffer, sharp(buffer))
        thumbnails.push(path)
      }

    const updateValues = {} as Partial<Post>
    ;(Object.entries(values) as [keyof Post, Post[keyof Post]][]).forEach(
      ([key, val]) => {
        if (val) (updateValues as Record<string, string | number>)[key] = val
      }
    )

    const [thumbnail, banner] = thumbnails

    await db
      .update(post)
      .set({
        ...updateValues,
        ...(thumbnail ? { thumbnail } : {}),
        ...(banner ? { banner } : {}),
      })
      .where(eq(post.id, Number(formData.get('id'))))
    revalidatePath(routes.addPost)
    return { success: true }
  } catch (e) {
    return {
      error: 'post already exists or something went wrong',
    }
  }
}

export const deletePost = async (formData: FormData) => {
  try {
    await db.delete(post).where(eq(post.id, Number(formData.get('id'))))

    revalidatePath(routes.addPost)
    return { success: 'deleted' }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}

export const createSlide = async (formData: FormData) => {
  const [mapped, file] = getFormValues<Slider>(formData)

  if (!file) throw { error: 'file not uploaded' }
  const buffer = Buffer.from(await file[0].arrayBuffer())

  try {
    const { path } = await writeFile(
      file,
      buffer,
      sharp(buffer),
      'outside',
      1500,
      600
    )

    await db.insert(slider).values({ ...mapped, thumbnail: path })

    revalidatePath(routes.addProduct)
    return { success: 'Product added' }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}

export const editSlide = async (formData: FormData) => {
  const [values] = getFormValues<Slider>(formData)
  try {
    const updateValues = {} as Partial<Product>
    ;(
      Object.entries(values) as [keyof Product, Product[keyof Product]][]
    ).forEach(([key, val]) => {
      if (val) (updateValues as Record<string, string | number>)[key] = val
    })

    await db
      .update(slider)
      .set(updateValues)
      .where(eq(slider.id, Number(formData.get('id'))))

    revalidatePath(routes.addSlider)
    return { success: true }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}

export const deleteSlide = async (formData: FormData) => {
  try {
    await db.delete(slider).where(eq(slider.id, Number(formData.get('id'))))

    revalidatePath(routes.addSlider)
    return { success: 'deleted' }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}

export const createHeadline = async (formData: FormData) => {
  const [mapped] = getFormValues<Headline>(formData)

  try {
    await db.insert(headline).values({ ...mapped })

    return { success: 'Headline added' }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}

export const editHeadline = async (formData: FormData) => {
  const [values] = getFormValues<Headline>(formData)
  try {
    const updateValues = {} as Partial<Product>
    ;(
      Object.entries(values) as [keyof Product, Product[keyof Product]][]
    ).forEach(([key, val]) => {
      if (val) (updateValues as Record<string, string | number>)[key] = val
    })

    await db
      .update(headline)
      .set(updateValues)
      .where(eq(headline.id, Number(formData.get('id'))))

    return { success: true }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}

export const deleteHeadline = async (formData: FormData) => {
  try {
    await db.delete(headline).where(eq(headline.id, Number(formData.get('id'))))

    return { success: 'deleted' }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}

export const createCertificate = async (formData: FormData) => {
  const [mapped] = getFormValues<Cert>(formData)

  try {
    await db.insert(certificate).values({ ...mapped })

    return { success: 'Certificate added' }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}

export const editCertificate = async (formData: FormData) => {
  const [values] = getFormValues<Cert>(formData)
  try {
    const updateValues = {} as Partial<Product>
    ;(
      Object.entries(values) as [keyof Product, Product[keyof Product]][]
    ).forEach(([key, val]) => {
      if (val) (updateValues as Record<string, string | number>)[key] = val
    })

    await db
      .update(certificate)
      .set(updateValues)
      .where(eq(certificate.id, Number(formData.get('id'))))

    return { success: true }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}

export const deleteCertificate = async (formData: FormData) => {
  try {
    await db
      .delete(certificate)
      .where(eq(certificate.id, Number(formData.get('id'))))

    return { success: 'deleted' }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}
