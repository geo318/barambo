import { axiosInstance } from './axios'
import { Blog, Category, Post, Product, SubCategory } from '/types'

export const getProducts = async (
  page: number,
  query?: string,
  category?: number
): Promise<{ products: Product[]; page: number }> => {
  const res = await axiosInstance.get(
    `/products?page=${page}&query=${query ?? ''}&category=${category ?? ''}`
  )
  return res.data
}

export const getAllCategories = async (): Promise<
  (Category & { subCategories: SubCategory[] })[]
> => {
  const res = await axiosInstance.get('/categories')
  return res.data
}

export const getSimilarProducts = async (
  productId: number
): Promise<Product[]> => {
  const res = await axiosInstance.get(`/products/${productId}/similar`)
  return res.data
}

export const getPaginatedPosts = async (
  filter: Blog,
  page: number
): Promise<Post[]> => {
  const res = await axiosInstance.get(`/posts?filter=${filter}&page=${page}`)
  return res.data
}

export const getLatestPosts = async (filter: Blog): Promise<Post[]> => {
  const res = await axiosInstance.get(`/posts/latest?filter=${filter}`)
  return res.data
}

export const getPost = async (slug: string): Promise<Post> => {
  const res = await axiosInstance.get(`/posts/${slug}`)
  return res.data
}

export const countPosts = async (filter: Blog): Promise<number> => {
  const res = await axiosInstance.get(`/posts/page?filter=${filter}`)
  return res.data
}
