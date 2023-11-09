import { Category, FormAction, Product, SubCategory } from '/types'

export type CategoryProps = {
  action: FormAction
  edit?: number | null
  defaultValues?: Category | SubCategory | null
  main?: Category[]
  checked?: number
  subCategory?: SubCategory[]
  products?: Product[]
}
