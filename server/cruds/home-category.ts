'use server'

import { homeCategory as model } from '/server'
import { createModel, updateModel } from './helper'
import { routes } from '/config'

const revalidate = [routes.addHomeCategory, `${routes.home}[lang]`]

export async function createHomeCategory(formData: FormData) {
  return createModel({ formData, model, revalidate })
}

export async function editHomeCategory(formData: FormData) {
  return updateModel({ formData, model, revalidate })
}
