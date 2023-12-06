'use server'

import { subCategory as model } from '/server'
import { createModel, updateModel, deleteModel } from './helper'
import { routes } from '/config'

const revalidate = [
  routes.addSubCategory,
  routes.addProduct,
  routes.product,
  `/[lang]${routes.product}`,
]

export async function createSubcategory(formData: FormData) {
  return createModel({ formData, model, revalidate })
}

export async function editSubcategory(formData: FormData) {
  return updateModel({ formData, model, revalidate })
}

export async function deleteSubcategory(formData: FormData) {
  return deleteModel({ formData, model, revalidate })
}
