'use client'
import { getMyPostsApi } from '@/apis/posts.api'
import { FilterContext, FilterContextType } from '@/components/FilterContextProvider'
import { IPostFilter } from '@/interfaces/posts.interface'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import PostItem from '../../_components/PostItem'
import Pagination from '@/components/Pagination'
import CardWithConfig from '@/components/CardWithConfig'
import BreadCrumb from '@/components/BreadCrumb'
import { PATH_ROUTER } from '@/common/constants/route.constant'
import PopoverPostConfig from './PopoverPostConfig'

export default function MyPostList() {
  const { myPostFilters } = useContext(FilterContext) as FilterContextType<IPostFilter>

  // Get posts
  const { data: posts, isError } = useQuery({
    queryKey: ['my-posts', myPostFilters.filters],
    queryFn: () => getMyPostsApi(myPostFilters.queryParams)
  })

  return (
    <div>
      <BreadCrumb nextRoute={{ name: 'My blogs', path: PATH_ROUTER.MY_POSTS }} />
      <section className='mt-12 mx-auto px-4 max-w-screen-xl md:px-8'>
        <div className='text-center'>
          <h1 className='text-3xl text-gray-800 font-semibold'>My blogs</h1>
        </div>
        {isError ? (
          <div className='text-center text-2xl text-red-600 font-semibold'>Something went wrong</div>
        ) : (
          <div className='mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3'>
            {posts?.data &&
              posts.data.map((items) => (
                <div className='relative' key={items.id}>
                  <CardWithConfig>
                    <PopoverPostConfig id={items.id} />
                  </CardWithConfig>
                  <PostItem key={items.id} blog={items} />
                </div>
              ))}
          </div>
        )}
      </section>
      <Pagination pagination={posts && posts.pagination} filters={myPostFilters} />
    </div>
  )
}
