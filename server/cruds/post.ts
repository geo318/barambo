'use server'

import { db, post as model } from '/server'
import { createModel, updateModel, deleteModel } from './helper'
import { routes } from '/config'
import { generateSlug } from '/utils'

const revalidate = [
  routes.addPost,
  routes.blog,
  `${routes.home}[lang]`,
  `/[lang]${routes.blog}/[slug]`,
]

export async function createPost(formData: FormData) {
  const postTitle = formData.get('title_eng')
  if (typeof postTitle === 'string') {
    formData.set('slug', generateSlug(postTitle))
  }

  return createModel({ formData, model, revalidate })
}

export async function editPost(formData: FormData) {
  const postTitle = formData.get('title_eng')
  if (typeof postTitle === 'string') {
    formData.set('slug', generateSlug(postTitle))
  }

  return updateModel({ formData, model, revalidate })
}

export async function deletePost(formData: FormData) {
  return deleteModel({ formData, model, revalidate })
}
