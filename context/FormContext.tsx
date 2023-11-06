'use client'

import { createContext, useState } from 'react'
import { SetState } from '/types'

type TFormContext = {
  defaultValues?: Record<string, string | number | null | undefined>
  setDefaultValues?: SetState<TFormContext['defaultValues']>
}

export const FormContext = createContext<TFormContext>({
  defaultValues: undefined,
  setDefaultValues: undefined,
})

export const FormContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [defaultValues, setDefaultValues] = useState<
    TFormContext['defaultValues']
  >({})

  return (
    <FormContext.Provider value={{ defaultValues, setDefaultValues }}>
      {children}
    </FormContext.Provider>
  )
}
