import { Category, FormAction } from '/types'

export type CategoryProps = {
  action: FormAction
  edit?: number | null
  defaultValues?: Category | null
  main?: Category[]
  checked?: string[]
}
