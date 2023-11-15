'server actions'

import { eq, sql } from 'drizzle-orm'
import { db, post } from '/server'
import { Blog, Post } from '/types'
import { cache } from 'react'
import { BLOG_PAGE } from '/config'

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
