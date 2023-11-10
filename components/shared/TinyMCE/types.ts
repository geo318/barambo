import { ChangeEvent } from 'react'
import { RegisterOptions } from 'react-hook-form'

export type Props = {
  labelName?: string
  inputName: string
  height: number | string
  placeholder?: string
  externalOnChangeHandler?: (e?: ChangeEvent) => void
  registerOptions?: RegisterOptions
}
