'use server'

import { discover as model } from '/server'
import { createModel, updateModel } from './helper'
import { routes } from '/config'

const revalidate = [routes.addDiscover, `${routes.home}[lang]`]

export async function createDiscover(formData: FormData) {
  return createModel({ formData, model, revalidate })
}

export async function editDiscover(formData: FormData) {
  return updateModel({ formData, model, revalidate })
}
