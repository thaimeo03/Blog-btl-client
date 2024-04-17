'use client'
import { IPagination } from '@/interfaces/response.interface'
import { pagesValue } from '@/lib/utils'
import { FormEvent, useState } from 'react'
import { IFilterContext } from './FilterContextProvider'

interface PaginationProps<T> {
  pagination?: IPagination
  filters: IFilterContext<T>
}

export default function Pagination<T>({ pagination, filters }: PaginationProps<T>) {
  // Calculate pages value
  const pageList = pagination ? pagesValue(pagination) : []
  const [toPage, setToPage] = useState('')

  const handleChangePage = (page?: number) => {
    if (!page) return
    return filters.setFilters({ ...filters.filters, page: page })
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if ((pagination && Number(value) <= pagination.total_page && Number(value) > 0) || value === '') {
      setToPage(value.toString())
    }
  }

  const handleGoToPage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Reset input
    filters.setFilters({ ...filters.filters, page: Number(toPage) })
    return setToPage('')
  }

  return (
    <nav className='mt-5 flex justify-center col-span-full'>
      <ul className='inline-flex -space-x-px text-sm'>
        <li onClick={() => handleChangePage(1)}>
          <span className='flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-500 cursor-pointer'>
            Head
          </span>
        </li>
        {pagination &&
          pageList.map((page) => {
            return (
              <li key={page} onClick={() => handleChangePage(page)}>
                <span
                  className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-400 hover:text-white cursor-pointer ${
                    page === pagination.current_page ? 'bg-gray-400 text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  {page}
                </span>
              </li>
            )
          })}

        <li onClick={() => handleChangePage(pagination && pagination.total_page)}>
          <span className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer'>
            Last
          </span>
        </li>
        <li>
          <form onSubmit={handleGoToPage}>
            <input
              className='h-8 leading-tight w-[90px] outline:none border px-2 dark:text-black dark:bg-white'
              placeholder='Go to page'
              onChange={handleChangeInput}
              value={toPage}
            />
          </form>
        </li>
      </ul>
    </nav>
  )
}
