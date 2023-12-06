'use server'

import { certificate as model } from '/server'
import { createModel, updateModel, deleteModel } from './helper'
import { routes } from '/config'

const revalidate = [routes.addCertificate, `${routes.about}[lang]`, `${routes.home}[lang]`]

export async function createCertificate(formData: FormData) {
  return createModel({ formData, model, revalidate })
}

export async function editCertificate(formData: FormData) {
  return updateModel({ formData, model, revalidate })
}

export async function deleteCertificate(formData: FormData) {
  return deleteModel({ formData, model, revalidate })
}
