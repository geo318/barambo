'use client'

import { createContext, useState } from 'react'
import { SetState } from '/types'

type TFormContext = {
  defaultValues?: Record<string, string | number | null | undefined>
  setDefaultValues?: SetState<TFormContext['defaultValues']>
  setId?: SetState<TFormContext['id']>
  id?: number
}

export const FormContext = createContext<TFormContext>({
  defaultValues: undefined,
  setDefaultValues: undefined,
  id: undefined,
})

export const FormContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [defaultValues, setDefaultValues] = useState<
    TFormContext['defaultValues']
  >({})
  const [id, setId] = useState<TFormContext['id']>(undefined)

  return (
    <FormContext.Provider
      value={{ defaultValues, setDefaultValues, id, setId }}
    >
      {children}
    </FormContext.Provider>
  )
}
