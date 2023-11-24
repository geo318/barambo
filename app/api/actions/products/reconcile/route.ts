import { reconcileProductCategories } from '/server'

export const GET = async () => {
  try {
    const res = await reconcileProductCategories()

    return new Response(JSON.stringify(JSON.stringify(res)), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify(JSON.stringify(e)), { status: 500 })
  }
}
