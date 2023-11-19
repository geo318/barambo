import { countPosts } from '/server'
import { Blog } from '/types'

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const filter = searchParams.get('filter') as Blog & {}
  const pages = await countPosts(filter ?? 'news')

  return new Response(JSON.stringify(pages), { status: 200 })
}
