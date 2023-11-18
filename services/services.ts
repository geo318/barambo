import { axiosInstance } from './axios'
import { Category, Product, SubCategory } from '/types'

export const getProducts = async (
  page: number,
  query?: string
): Promise<{ products: Product[]; page: number }> => {
  const res = await axiosInstance.get(
    `/products?page=${page}&query=${query ?? ''}`
  )
  return res.data
}

export const getAllCategories = async (): Promise<
  (Category & { subCategories: SubCategory[] })[]
> => {
  const res = await axiosInstance.get('/categories')
  return res.data
}
