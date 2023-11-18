'use client'

import { useSearch } from './useSearch'
import { Magnifier } from '/components'

export const Search = () => {
  const { handleSearch } = useSearch()
  return (
    <div className='relative mb-14 mt-10'>
      <Magnifier className='absolute left-0 mt-1/2 translate-y-1/2' />
      <input
        type='text'
        name='search'
        placeholder='Search'
        className='border-0 border-b pl-5 w-52'
        onChange={handleSearch}
      />
    </div>
  )
}
