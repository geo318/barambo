'use server'

import { eq, sql, like, or, and, desc, asc } from 'drizzle-orm'
import {
  category,
  certificate,
  db,
  headline,
  post,
  product,
  productsToSubcategories,
  slider,
  subCategory,
} from '/server'
import { Blog, Post } from '/types'
import { cache } from 'react'
import { BLOG_PAGE, PRODUCT_PAGE } from '/config'

export const getHomepagePosts = cache(async () => {
  const posts = await db
    .select()
    .from(post)
    .where(or(eq(post.type, 'news'), eq(post.type, 'csr')))
    .orderBy(desc(post.order))
    .limit(3)
    .prepare()
    .execute()

  return posts
})

export const getHomepageRecept = cache(async () => {
  const receipts = await db
    .select({ thumbnail: post.thumbnail, id: post.id, slug: post.slug })
    .from(post)
    .where(eq(post.type, 'recept'))
    .orderBy(desc(post.order))
    .limit(8)
    .prepare()
    .execute()

  return receipts
})

export const getPaginatedPosts = cache(async (filter: Blog, page: number) => {
  const posts = await db
    .select({ thumbnail: post.thumbnail, id: post.id, slug: post.slug })
    .from(post)
    .where(eq(post.type, filter))
    .orderBy(desc(post.order))
    .offset((page - 1) * BLOG_PAGE)
    .limit(BLOG_PAGE)
    .prepare()
    .execute()

  return posts
})

export const getPaginatedProducts = cache(
  async (
    page: number,
    filter: string = '_',
    categoryId?: number,
    mainCategoryId?: number
  ) => {
    let products
    if (categoryId) {
      products = (
        await db
          .selectDistinct()
          .from(product)
          .innerJoin(
            productsToSubcategories,
            eq(product.id, productsToSubcategories.productId)
          )
          .innerJoin(
            subCategory,
            eq(productsToSubcategories.subCategoryId, subCategory.id)
          )
          .where(eq(subCategory.id, categoryId))
          .orderBy(desc(product.order))
          .offset((page - 1) * PRODUCT_PAGE)
          .limit(PRODUCT_PAGE)
          .execute()
      ).map((c) => c.product)
    } else if (mainCategoryId) {
      products = (
        await db
          .selectDistinct()
          .from(product)
          .innerJoin(
            productsToSubcategories,
            eq(product.id, productsToSubcategories.productId)
          )
          .innerJoin(
            subCategory,
            eq(productsToSubcategories.subCategoryId, subCategory.id)
          )
          .innerJoin(category, eq(subCategory.categoryId, category.id))
          .where(eq(category.id, mainCategoryId))
          .orderBy(desc(product.order))
          .offset((page - 1) * PRODUCT_PAGE)
          .limit(PRODUCT_PAGE)
          .execute()
      ).map((c) => c.product)
    } else
      products = await db
        .select()
        .from(product)
        .where(
          or(
            like(product.title_eng, `%${filter}%`),
            like(product.title_geo, `%${filter}%`)
          )
        )
        .orderBy(desc(product.order))
        .offset((page - 1) * PRODUCT_PAGE)
        .limit(PRODUCT_PAGE)
        .execute()

    return { products, page }
  }
)

export const getPost = cache(async (slug: string) => {
  const posts = await db
    .select()
    .from(post)
    .where(eq(post.slug, slug))
    .prepare()
    .execute()

  return posts[0]
})

export const getLatestPosts = cache(async (type: Post['type']) => {
  const posts = await db
    .select()
    .from(post)
    .where(eq(post.type, type))
    .orderBy(desc(post.order))
    .limit(5)
    .prepare()
    .execute()

  return posts
})

export const getProduct = cache(
  async (id: number) =>
    await db
      .select()
      .from(product)
      .where(eq(product.id, id))
      .prepare()
      .execute()
)

export const countPosts = cache(async (type: Post['type']) => {
  const count = await db
    .select({
      count: sql<number>`cast(count(${post.id}) as int)`,
    })
    .from(post)
    .where(eq(post.type, type))
    .execute()

  return Math.floor(count[0].count / BLOG_PAGE)
})

export const getAllCategories = cache(async () => {
  const categories = await db.query.category.findMany({
    orderBy: asc(category.order),
    with: {
      subCategories: {
        orderBy: asc(subCategory.order),
      },
    },
  })
  return categories
})

export const getCategories = async () =>
  await db.select().from(category).orderBy(category.order)

export const getSubCategories = async () =>
  await db.select().from(subCategory).orderBy(subCategory.order)

export const getProducts = async () => await db.select().from(product)

export const getPosts = async () => await db.select().from(post)

export const getPostsSlugs = async () =>
  await db.select({ slug: post.slug }).from(post)

export const getSlides = async () => await db.select().from(slider)

export const getHeadLine = async () => (await db.select().from(headline))[0]

export const getCertificates = async () => await db.select().from(certificate)

export const reconcileProductCategories = async () => {
  const products = await db.select().from(product).execute()
  const productCategories: { productId: number; subCategoryIds: number[] }[] =
    []
  for (const product of products) {
    const subCategoryIds = product.categoryIds.split(',').map(Number)
    const productId = product.id
    productCategories.push({ productId, subCategoryIds })
  }

  for (const productCategory of productCategories) {
    const { productId, subCategoryIds } = productCategory
    for (const subCategoryId of subCategoryIds) {
      const exists = await db
        .select()
        .from(productsToSubcategories)
        .where(
          and(
            eq(productsToSubcategories.productId, productId),
            eq(productsToSubcategories.subCategoryId, subCategoryId)
          )
        )

      if (exists.length) continue

      await db
        .insert(productsToSubcategories)
        .values({
          productId,
          subCategoryId,
        })
        .execute()
    }
  }
}
