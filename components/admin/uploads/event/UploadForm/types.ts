export type Props<T> = {
  handleSubmit: (data: FormData) => Promise<void>
  defaultValues?: Partial<T>
  revalidate?: () => void
}
