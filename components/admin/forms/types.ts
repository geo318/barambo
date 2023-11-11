import { Category, FormAction, Post, Product, SubCategory } from '/types'

export type CategoryProps = {
  action: FormAction
  edit?: number | null
  defaultValues?: Category | SubCategory | null
  main?: Category[]
  checked?: number
}

export type ProductProps = {
  action: FormAction
  edit?: number | null
  defaultValues?: Product | null
  checked?: number
  subCategory: SubCategory[]
  products?: Product[]
}

export type PostProps = {
  action: FormAction
  edit?: number | null
  defaultValues?: Post | null
  checked?: number
}
