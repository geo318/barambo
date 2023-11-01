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
    type: 'email',
  },
  school: {
    required: true,
    type: 'phone',
  },
  description: {
    required: false,
    type: 'textarea',
  },
} as const

export const orderCardFormInitialValues = (
  Object.keys(excursionForm) as (keyof typeof excursionForm)[]
).reduce((acc, key) => {
  acc[key] = ''
  return acc
}, {} as Record<keyof typeof excursionForm, string>)
