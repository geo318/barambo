import { getPaginatedProducts } from '/server'

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page')
  const query = searchParams.get('query')
  const products = await getPaginatedProducts(Number(page) ?? 1, query ?? '_')
  return new Response(JSON.stringify(products), { status: 200 })
}
