import { useParams, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getPaginatedPosts } from '/services'
import { Blog, Locale } from '/types'

export const useBlogPosts = () => {
  const params = useSearchParams()
  const lang = useParams().lang as Locale
  const filter = params.get('filter') as Blog
  const page = Number(params.get('page')) || 1
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', filter ?? 'news', page],
    queryFn: () => getPaginatedPosts(filter ?? 'news', page),
  })
  return { posts, filter, isLoading, lang }
}
