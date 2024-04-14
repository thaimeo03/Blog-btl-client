'use client'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { FilterContext, FilterContextType } from './FilterContextProvider'
import { IPostFilter } from '@/interfaces/posts.interface'
import { postFiltersInitialValue } from '@/common/constants/defaultValues.constant'
import { PATH_ROUTER } from '@/common/constants/route.constant'

export default function Logo() {
  const router = useRouter()
  const { postFilters } = useContext(FilterContext) as FilterContextType<IPostFilter>

  const handleClick = () => {
    // Reset filters
    postFilters.setFilters(postFiltersInitialValue)
    router.push(PATH_ROUTER.HOME)
  }

  return (
    <button onClick={handleClick} type='button' className='flex mr-4'>
      <img src='https://flowbite.s3.amazonaws.com/logo.svg' className='mr-3 h-8' alt='FlowBite Logo' />
      <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>Flowbite</span>
    </button>
  )
}
