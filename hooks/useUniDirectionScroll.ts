import { useEffect, useMemo, useState } from 'react'
import { set } from 'zod'

export const useUniDirectionScroll = <T>(
  arr: T[],
  setArray: React.Dispatch<React.SetStateAction<T[]>>,
  dir: 'left' | 'right',
  group = 3
) => {
  const [position, setPosition] = useState(0)

  const store = [...arr]
  const length = store.length

  switch (dir) {
    case 'left': {
      const diff = position - group
      if (diff < 0) {
        store.unshift(...arr)
        store.pop()
      }
      setPosition((prev) => prev--)
    }
    case 'right': {
      const diff = length - position - group
      if (diff < 0) {
        store.push(...arr)
        store.shift()
      }
      setPosition((prev) => prev++)
    }
  }

  return [store, position]
}
