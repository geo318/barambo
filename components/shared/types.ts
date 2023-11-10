import { SubmitHandler } from 'react-hook-form'
import { Schema } from 'zod'

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  variant?: 'primary' | 'secondary'
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type CustomHeading = {
  tag: HeadingTag & {}
  size?: 'md' | 'lg' | 'sm' | 'xl'
} & JSX.IntrinsicElements[HeadingTag]

export type FormProps = {
  children: React.ReactNode
  schema: Schema
  defaultValues?: Record<string, string | number | undefined | null> | null
  onSubmit?: SubmitHandler<Record<string, string | number | null | undefined>>
  buttonLabel?: string
  className?: string
  revalidate?: () => void
  hasButton?: boolean
  formRef?: React.MutableRefObject<HTMLFormElement | null>
}
