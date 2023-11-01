export const getImage = (path: string) => {
  return `${"process.env.NEXT_PUBLIC_IMAGE_URL"}${path}`
}

export const getBlurImage = (path: string) => {
  if (!path) return
  const slug = path.split(/\//).pop()
  return `${"process.env.NEXT_PUBLIC_IMAGE_URL"}/blur/${slug}`
}
