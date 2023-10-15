import { SetState } from '/types'

export const uniDirectionScroll = <T>(
  arr: T[],
  setArray: SetState<T[]>,
  dir: 'left' | 'right',
  position: number,
  setPosition: SetState<number>,
  group = 3
) => {
  const store = [...arr]
  const length = store.length

  switch (dir) {
    case 'left': {
      const diff = position - group
      if (diff < 0) {
        store.unshift(...arr)
        store.pop()
        setArray(store)
      }
      setPosition((prev) => prev--)
      break
    }
    case 'right': {
      const diff = length - position - group
      if (diff <= 0) {
        store.push(...arr)
        store.shift()
        setArray(store)
      }
      setPosition((prev) => prev++)
      console.log(position, length, diff, store, arr, group)
      break
    }
  }
}
