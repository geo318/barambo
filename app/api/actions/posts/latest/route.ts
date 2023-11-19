import { getLatestPosts } from '/server'
import { Blog } from '/types'

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const filter = searchParams.get('filter') as Blog & {}

  const posts = await getLatestPosts(filter ?? 'news')
  return new Response(JSON.stringify(posts), { status: 200 })
}
