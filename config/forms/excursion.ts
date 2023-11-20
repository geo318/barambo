export const excursionForm = {
  name: {
    required: true,
    type: 'text',
  },
  phone: {
    required: true,
    type: 'text',
  },
  class: {
    required: true,
    type: 'text',
  },
  school: {
    required: true,
    type: 'text',
  },
  file: {
    required: false,
    type: 'file',
  },
  description: {
    required: false,
    type: 'textarea',
  },
} as const

export const excursionFormInitialValues = (
  Object.keys(excursionForm) as (keyof typeof excursionForm)[]
).reduce((acc, key) => {
  acc[key] = ''
  return acc
}, {} as Record<keyof typeof excursionForm, string>)
