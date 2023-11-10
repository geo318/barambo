export const getImage = (_: ReadonlyArray<string>, slug: string) =>
  `${process.env.NEXT_PUBLIC_IMAGE_URL}${slug}`

export const getBlurImage = (path: string) => {
  if (!path) return
  const slug = path.split(/\//).pop()
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/blur/${slug}`
}
