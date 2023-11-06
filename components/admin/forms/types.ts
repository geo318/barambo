import { Category } from "/types"

export type CategoryProps = {
  main?: Category[]
  action?: (formData: FormData) => Promise<Response | undefined>
  edit?: boolean
  defaultValues?: Category
}
