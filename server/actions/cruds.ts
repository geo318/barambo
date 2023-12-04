'use server'

import { revalidatePath } from 'next/cache'
import {
  category,
  certificate,
  db,
  discover,
  file,
  headline,
  post,
  product,
  productsToSubcategories,
  slider,
  subCategory,
} from '/server'
import {
  Category,
  Cert,
  Discover,
  Headline,
  Post,
  Product,
  Slider,
  SubCategory,
} from '/types'
import { generateSlug, getFormValues, writeFile } from '/utils'
import { and, eq } from 'drizzle-orm'
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
    revalidatePath(routes.addSubCategory)
    revalidatePath(routes.product)
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
    revalidatePath(routes.addProduct)
    revalidatePath(routes.product)
    return { success: true }
  } catch (e) {
    console.log(e)
    return {
      error: 'category already exists or something went wrong',
    }
  }
}

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
    revalidatePath(routes.addSubCategory)
    revalidatePath(routes.product)
    return { success: true }
  } catch (e) {
    console.log(e)
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
    revalidatePath(routes.addProduct)
    revalidatePath(routes.product)
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
    revalidatePath(routes.addProduct)
    revalidatePath(routes.product)
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
    revalidatePath(routes.addSubCategory)
    revalidatePath(routes.product)
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

    const res = await db.insert(product).values({ ...mapped, thumbnail: path })

    const subCategoryIds = mapped.categoryIds.split(',').map(Number)
    for (const subCategoryId of subCategoryIds) {
      await saveProductToSubcategory(Number(res.lastInsertRowid), subCategoryId)
    }

    revalidatePath(routes.addProduct)
    revalidatePath(routes.product)
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

  const subCategoryIds = values.categoryIds.split(',').map(Number)
  const categoryProducts = await db
    .select()
    .from(productsToSubcategories)
    .where(eq(productsToSubcategories.productId, Number(formData.get('id'))))
    .execute()

  for (const ci of subCategoryIds) {
    if (categoryProducts.some((cp) => cp.subCategoryId === ci)) continue
    else await saveProductToSubcategory(Number(formData.get('id')), ci)
  }

  for (const cp of categoryProducts) {
    if (subCategoryIds.some((ci) => ci === cp.subCategoryId)) continue
    else
      await db
        .delete(productsToSubcategories)
        .where(
          and(
            eq(productsToSubcategories.productId, Number(formData.get('id'))),
            eq(productsToSubcategories.subCategoryId, cp.subCategoryId)
          )
        )
  }

  try {
    if (buffer && buffer.toString()) {
      const { path } = await writeFile(
        file,
        buffer,
        sharp(buffer),
        'inside',
        500,
        undefined
      )
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
    revalidatePath(routes.product)
    return { success: true }
  } catch (e) {
    return {
      error: 'product already exists or something went wrong',
    }
  }
}

export const deleteProduct = async (formData: FormData) => {
  try {
    await db.delete(product).where(eq(product.id, Number(formData.get('id'))))

    revalidatePath(routes.addProduct)
    revalidatePath(routes.product)
    return { success: 'deleted' }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}

export const createPost = async (formData: FormData) => {
  const [mapped, files] = getFormValues<Post>(formData)
  const slug = generateSlug(mapped.title_eng)

  try {
    const thumbnails: string[] = []
    if (files && files?.length)
      for (const file of files) {
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
    revalidatePath(`${routes.home}[lang]`, 'page')
    revalidatePath(`${routes.blog}`, 'page')
    return { success: 'Post added' }
  } catch (e) {
    return {
      error: 'post already exists or something went wrong',
    }
  }
}

export const editPost = async (formData: FormData) => {
  const [values, files] = getFormValues<Post>(formData)
  const slug = generateSlug(values.title_eng)
  values.slug = slug

  try {
    const thumbnails: string[] = []
    if (files && files?.length)
      for (const file of files) {
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
    const thumbnail =
      typeof formData.get('thumbnail') === 'string' ? undefined : thumbnails[0]
    const banner = thumbnail ? thumbnails[1] : thumbnails[0]

    await db
      .update(post)
      .set({
        ...updateValues,
        ...(thumbnail ? { thumbnail } : {}),
        ...(banner ? { banner } : {}),
      })
      .where(eq(post.id, Number(formData.get('id'))))

    revalidatePath(routes.addPost)
    revalidatePath(`${routes.blog}`, 'page')
    revalidatePath(`/[lang]${routes.blog}/[slug]`, 'page')
    revalidatePath(`${routes.home}[lang]`, 'page')
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
    revalidatePath(`${routes.blog}`, 'page')
    revalidatePath(`${routes.home}[lang]`, 'page')
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
    revalidatePath(`${routes.home}[lang]`, 'page')
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
    revalidatePath(`${routes.home}[lang]`, 'page')
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
    revalidatePath(`${routes.home}[lang]`, 'page')
    return { success: 'deleted' }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}

export const createHeadline = async (formData: FormData) => {
  const [mapped] = getFormValues<Headline>(formData)
  revalidatePath(routes.addHeadline)
  revalidatePath(`${routes.home}[lang]`, 'page')

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

    revalidatePath(routes.addHeadline)
    revalidatePath(`${routes.home}[lang]`, 'page')
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

    revalidatePath(routes.addHeadline)
    revalidatePath(`${routes.home}[lang]`, 'page')
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

    revalidatePath(routes.addCertificate)
    revalidatePath(`${routes.about}[lang]`, 'page')
    revalidatePath(`${routes.home}[lang]`, 'page')
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
    revalidatePath(routes.addCertificate)
    revalidatePath(`${routes.about}[lang]`, 'page')
    revalidatePath(`${routes.home}[lang]`, 'page')

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
    revalidatePath(routes.addCertificate)
    revalidatePath(`${routes.about}[lang]`, 'page')
    revalidatePath(`${routes.home}[lang]`, 'page')

    return { success: 'deleted' }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}

async function saveProductToSubcategory(
  productId: number,
  subCategoryId: number
) {
  await db.insert(productsToSubcategories).values({ productId, subCategoryId })
}

export const createFile = async (formData: FormData) => {
  const [_, files] = getFormValues<{ name: string }[]>(formData)
  const img = files[0]
  try {
    const buffer = Buffer.from(await img.arrayBuffer())
    const { path } = await writeFile(
      [img],
      buffer,
      sharp(buffer),
      'outside',
      800,
      undefined
    )
    await db.insert(file).values({ name: img.name, path })
    revalidatePath(routes.addFile)
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}

export const createDiscover = async (formData: FormData) => {
  const [values, files] = getFormValues<Discover>(formData)

  try {
    const thumbnails: string[] = []
    if (files && files?.length)
      for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const { path } = await writeFile([file], buffer, sharp(buffer))
        thumbnails.push(path)
      }

    const [thumbnail, banner] = thumbnails
    values.thumbnail = thumbnail
    values.background = banner

    await db.insert(discover).values(values)
    revalidatePath(routes.addDiscover)
    revalidatePath(`${routes.home}[lang]`, 'page')
    return { success: 'added' }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}

export const editDiscover = async (formData: FormData) => {
  const [values, files] = getFormValues<Discover>(formData)
  try {
    const thumbnails: string[] = []
    if (files && files?.length)
      for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const { path } = await writeFile([file], buffer, sharp(buffer))
        thumbnails.push(path)
      }

    const updateValues = {} as Partial<Discover>
    ;(
      Object.entries(values) as [keyof Discover, Discover[keyof Discover]][]
    ).forEach(([key, val]) => {
      if (val) (updateValues as Record<string, string | number>)[key] = val
    })
    const thumbnail =
      typeof formData.get('thumbnail') === 'string' ? undefined : thumbnails[0]
    const background = thumbnail ? thumbnails[1] : thumbnails[0]

    await db
      .update(discover)
      .set({
        ...updateValues,
        ...(thumbnail ? { thumbnail } : {}),
        ...(background ? { background } : {}),
      })
      .where(eq(discover.id, Number(formData.get('id'))))

    revalidatePath(routes.addDiscover)
    revalidatePath(`${routes.home}[lang]`, 'page')
    return { success: true }
  } catch (e) {
    return {
      error: 'something went wrong',
    }
  }
}
