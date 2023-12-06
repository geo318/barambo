'use server'

import { file as model } from '/server'
import { createModel } from './helper'
import { routes } from '/config'

const revalidate = [routes.addSlider, `${routes.home}[lang]`]

export async function createFile(formData: FormData) {
  return createModel({
    formData,
    model,
    revalidate,
    imgOptions: {
      fit: 'outside',
      width: 800,
    },
  })
}
