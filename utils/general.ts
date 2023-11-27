export const getImage = (_: ReadonlyArray<string>, slug: string) =>
  `${process.env.NEXT_PUBLIC_IMAGE_URL}${slug}`

export const getBlurImage = (_: ReadonlyArray<string>, slug: string) => {
  const path = slug?.split(/\//).pop()
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/blur/${path}`
}

export const checkStringFalsy = (value?: string | null) =>
  !value || value === 'undefined' || value === 'null' ? null : value
