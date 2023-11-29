export const getImage = (_: ReadonlyArray<string>, slug: string) =>
  `${process.env.NEXT_PUBLIC_IMAGE_URL}${slug}`

export const getBlurImage = (_: ReadonlyArray<string>, slug: string) => {
  const path = slug?.split(/\//).pop()
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/blur/${path}`
}

export const checkStringFalsy = (value?: string | null) =>
  !value || value === 'undefined' || value === 'null' ? null : value

export const generateSlug = (slug: string) =>
  slug
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]|[,":]/g, '')
    .toLowerCase()

export const purgeTags = (text: string, tag = 'img', flags = 'g', paste = '') =>
  text.replace(new RegExp(`<${tag}\\s[^>]*\\/?>`, flags), paste)

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number = 500
) => {
  let timeoutId: NodeJS.Timeout
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
