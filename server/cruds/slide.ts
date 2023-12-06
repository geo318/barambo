'use server'

import { slider as model } from '/server'
import { createModel, updateModel, deleteModel } from './helper'
import { routes } from '/config'

const revalidate = [routes.addSlider, `${routes.home}[lang]`]

export async function createSlide(formData: FormData) {
  return createModel({
    formData,
    model,
    revalidate,
    imgOptions: {
      fit: 'cover',
      width: 1500,
      height: 600,
    },
  })
}

export async function editSlide(formData: FormData) {
  return updateModel({
    formData,
    model,
    revalidate,
    imgOptions: {
      fit: 'cover',
      width: 1500,
      height: 600,
    },
  })
}

export async function deleteSlide(formData: FormData) {
  return deleteModel({ formData, model, revalidate })
}
