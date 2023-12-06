'use server'

import { category as model } from '/server'
import { createModel, updateModel, deleteModel } from './helper'
import { routes } from '/config'

const revalidate = [
  routes.addCategory,
  routes.addSubCategory,
  routes.product,
  `/[lang]${routes.product}`,
]

export async function createCategory(formData: FormData) {
  return createModel({ formData, model, revalidate })
}

export async function editCategory(formData: FormData) {
  return updateModel({ formData, model, revalidate })
}

export async function deleteCategory(formData: FormData) {
  return deleteModel({ formData, model, revalidate })
}
