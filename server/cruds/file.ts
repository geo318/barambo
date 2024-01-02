'use server'

import { file as model } from '/server'
import { createModel } from './helper'
import { routes } from '/config'

const revalidate = [routes.addFile]

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
