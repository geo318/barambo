'server actions'

import { eq } from 'drizzle-orm'
import { db, post } from '/server'
import { Blog, Post } from '/types'
import { cache } from 'react'

export const getPaginatedPosts = cache(async (filter: Blog, page: number) => {
  const posts = await db
    .select({ thumbnail: post.thumbnail, id: post.id, slug: post.slug })
    .from(post)
    .where(eq(post.type, filter))
    .offset(page * 12)
    .limit(12)
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
