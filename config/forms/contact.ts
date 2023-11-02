export const contactForm = {
  name: {
    required: true,
    type: 'text',
    options: null,
  },
  last_name: {
    required: true,
    type: 'text',
    options: null,
  },
  email: {
    required: true,
    type: 'text',
    options: null,
  },
  phone: {
    required: true,
    type: 'text',
    options: null,
  },
  subject: {
    type: 'radio',
    required: true,
    options: [
      { key: 'general' },
      { key: 'products' },
      { key: 'export' },
      { key: 'excursion' },
      { key: 'other' },
    ],
  },
  description: {
    required: false,
    type: 'textarea',
    options: null,
  },
} as const

export const contactFormInitialValues = (
  Object.keys(contactForm) as (keyof typeof contactForm)[]
).reduce((acc, key) => {
  acc[key] = ''
  return acc
}, {} as Record<keyof typeof contactForm, string>)
