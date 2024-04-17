'use client'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { FilterContext, FilterContextType } from './FilterContextProvider'
import { IPostFilter } from '@/interfaces/posts.interface'
import { postFiltersInitialValue } from '@/common/constants/defaultValues.constant'
import { PATH_ROUTER } from '@/common/constants/route.constant'
import Image from 'next/image'
import blogLogo from '@/public/logo/blog-logo.png'

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
      <Image src={blogLogo} className='mr-3 w-40 h-16 object-cover' alt='Logo' />
    </button>
  )
}
