'use server'

import { eq, sql, like, or, and } from 'drizzle-orm'
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
import { Blog, Post } from '/types'
import { cache } from 'react'
import { BLOG_PAGE, PRODUCT_PAGE } from '/config'

export const getHomepagePosts = cache(async () => {
  const posts = await db
    .select()
    .from(post)
    .where(or(eq(post.type, 'news'), eq(post.type, 'csr')))
    .limit(3)
    .prepare()
    .execute()

  return posts
})

export const getHomepageRecept = cache(async () => {
  const posts = await db
    .select({ thumbnail: post.thumbnail, id: post.id, slug: post.slug })
    .from(post)
    .where(eq(post.type, 'recept'))
    .limit(8)
    .prepare()
    .execute()

  return posts
})

export const getPaginatedPosts = cache(async (filter: Blog, page: number) => {
  const posts = await db
    .select({ thumbnail: post.thumbnail, id: post.id, slug: post.slug })
    .from(post)
    .where(eq(post.type, filter))
    .offset((page - 1) * BLOG_PAGE)
    .limit(BLOG_PAGE)
    .prepare()
    .execute()

  return posts
})

export const getPaginatedProducts = cache(
  async (page: number, filter: string = '_', categoryId: string = '_') => {
    const products = await db
      .select()
      .from(product)
      .where(
        and(
          or(
            like(product.title_eng, `%${filter}%`),
            like(product.title_geo, `%${filter}%`)
          ),
          like(product.categoryIds, `%${categoryId}%`)
        )
      )
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
    with: {
      subCategories: true,
    },
  })
  return categories
})

export const getCategories = async () => await db.select().from(category)

export const getSubCategories = async () => await db.select().from(subCategory)

export const getProducts = async () => await db.select().from(product)

export const getPosts = async () => await db.select().from(post)

export const getPostsSlugs = async () =>
  await db.select({ slug: post.slug }).from(post)

export const getSlides = async () => await db.select().from(slider)

export const getHeadLine = async () => await db.select().from(headline)

export const getCertificates = async () => await db.select().from(certificate)
