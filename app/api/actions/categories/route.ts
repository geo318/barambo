import { getAllCategories } from '/server'

export const GET = async () => {
  const categories = await getAllCategories()
  return new Response(JSON.stringify(categories), { status: 200 })
}
