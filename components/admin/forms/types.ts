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
  checked?: number
}

export type ProductProps = FormProps<Product> & {
  checked?: number
  subCategory: SubCategory[]
  products?: Product[]
}

export type PostProps = FormProps<Post> & { checked?: number }

export type SliderProps = FormProps<Slider>

export type HeadlineProps = FormProps<Headline>

export type CertProps = FormProps<Cert>

export type FormProps<T> = {
  action: FormAction
  edit?: number | null
  defaultValues?: T | null
}
