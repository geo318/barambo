import { getPostsSlugs } from '/server'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export async function generateStaticParams() {
  const posts = await getPostsSlugs()
  return posts.map(({ slug }) => ({ slug }))
}
