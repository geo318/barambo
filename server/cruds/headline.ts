'use server'

import { headline as model } from '/server'
import { createModel, updateModel } from './helper'
import { routes } from '/config'

const revalidate = [routes.addHeadline, `${routes.home}[lang]`]

export async function createHeadline(formData: FormData) {
  return createModel({ formData, model, revalidate })
}

export async function editHeadline(formData: FormData) {
  return updateModel({ formData, model, revalidate })
}
