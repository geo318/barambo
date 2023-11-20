'use client'

import { useSearch } from './useSearch'
import { Magnifier } from '/components'

export const Search = () => {
  const { handleSearch, clearSearch, query } = useSearch()
  return (
    <div className='relative mb-14 mt-10'>
      <Magnifier className='absolute left-0 top-1/2 -translate-y-1/2 pb-[2px]' />
      <input
        type='text'
        name='search'
        placeholder='Search'
        className='border-0 border-b border-[#BEBEBE] pl-5 py-2 w-52 focus:outline-none focus:border-black'
        onChange={handleSearch}
        value={query}
      />
      {query && (
        <a
          onClick={clearSearch}
          className='text-blue-500 hover:underline text-sm -ml-[2rem] cursor-pointer'
        >
          clear
        </a>
      )}
    </div>
  )
}
