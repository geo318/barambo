import { getPaginatedProducts } from '/server'

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const [page, query, category] = ['page', 'query', 'category'].map((param) =>
    searchParams.get(param)
  )

  const products = await getPaginatedProducts(
    Number(page) ?? 1,
    query ?? '_',
    category ?? '_'
  )
  return new Response(JSON.stringify(products), { status: 200 })
}
