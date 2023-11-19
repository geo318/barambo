import { getPaginatedPosts } from '/server'
import { Blog } from '/types'

export const GET = async (
  req: Request,
  context: { params: { slug: string } }
) => {
  const { searchParams } = new URL(req.url)
  const filter = searchParams.get('filter') as Blog & {}
  const page = Number(searchParams.get('page') ?? 1)

  const posts = await getPaginatedPosts(filter ?? 'news', page)
  return new Response(JSON.stringify(posts), { status: 200 })
}
