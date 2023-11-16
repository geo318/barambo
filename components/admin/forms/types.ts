import {
  Category,
  Cert,
  FormAction,
  Headline,
  Post,
  Product,
  Slider,
  SubCategory,
} from '/types'

export type CategoryProps = FormProps<Category> & {
  main?: Category[]
  subCategory?: SubCategory[]
}

export type ProductProps = FormProps<Product> & {
  subCategory: SubCategory[]
  products?: Product[]
}

export type PostProps = FormProps<Post> & { checked?: number }

export type SliderProps = FormProps<Slider>

export type HeadlineProps = FormProps<Headline>

export type CertProps = FormProps<Cert>

export type FormProps<T> = {
  action: FormAction
  query?: string | null
  defaultValues?: T[] | null
}
