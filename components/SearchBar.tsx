'use client'
import { useContext, useState } from 'react'
import { FilterContext, FilterContextType } from './FilterContextProvider'
import { IPostFilter } from '@/interfaces/posts.interface'
import { useRouter } from 'next/navigation'
import { PATH_ROUTER } from '@/common/constants/route.constant'

export default function SearchBar() {
  const router = useRouter()
  const { postFilters } = useContext(FilterContext) as FilterContextType<IPostFilter>
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(PATH_ROUTER.HOME)
    postFilters.setFilters({ ...postFilters.filters, title: searchValue })
  }

  return (
    <form className='hidden lg:block lg:pl-2' onSubmit={handleOnSubmit}>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <div className='relative mt-1 lg:w-96'>
        <button className='flex absolute inset-y-0 left-0 items-center pl-3 cursor-pointer'>
          <svg
            className='w-4 h-4 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            {' '}
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />{' '}
          </svg>
        </button>
        <input
          type='text'
          name='search'
          id='search'
          onChange={(e) => handleChange(e)}
          value={searchValue}
          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
          placeholder='Search'
        />
      </div>
    </form>
  )
}
