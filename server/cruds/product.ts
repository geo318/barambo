'use server'

import { db, product as model } from '/server'
import { createModel, updateModel, deleteModel } from './helper'
import { routes } from '/config'

const revalidate = [routes.addProduct, routes.product]

export async function createProduct(formData: FormData) {
  return createModel({ formData, model, revalidate })
}

export async function editProduct(formData: FormData) {
  return updateModel({ formData, model, revalidate })
}

export async function deleteProduct(formData: FormData) {
  return deleteModel({ formData, model, revalidate })
}
