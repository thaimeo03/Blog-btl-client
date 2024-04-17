'use client'
import { getAllPostsApi } from '@/apis/posts.api'
import { useQuery } from '@tanstack/react-query'
import PostItem from './PostItem'
import Pagination from '@/components/Pagination'
import { IPostFilter } from '@/interfaces/posts.interface'
import { useContext } from 'react'
import { FilterContext, FilterContextType } from '@/components/FilterContextProvider'
import Skeleton from '@/components/ui/Skeleton'

export default function PostList() {
  const { postFilters } = useContext(FilterContext) as FilterContextType<IPostFilter>

  // Get posts
  const { data: posts, isFetching } = useQuery({
    queryKey: ['posts', postFilters.filters],
    queryFn: () => getAllPostsApi(postFilters.queryParams)
  })

  return (
    <div>
      <section className='mt-8 mx-auto px-4 max-w-screen-xl md:px-8'>
        <div className='text-center'>
          <h1 className='text-3xl text-gray-800 font-semibold dark:text-white'>Blog</h1>
          <p className='mt-3 text-gray-500 dark:text-white'>
            Blogs that are loved by the community. Updated every hour.
          </p>
        </div>
        {isFetching ? (
          <Skeleton className='max-w-screen-lg' />
        ) : (
          <div className='mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3'>
            {posts?.data && posts.data.map((items) => <PostItem key={items.id} blog={items} />)}
          </div>
        )}
      </section>
      <Pagination pagination={posts && posts.pagination} filters={postFilters} />
    </div>
  )
}
