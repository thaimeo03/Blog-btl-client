import Avatar from '@/components/Avatar'
import { PATH_ROUTER } from '@/common/constants/route.constant'
import { IAllPostWithAuthor } from '@/interfaces/posts.interface'
import { formatDateFromISO } from '@/lib/utils'
import Link from 'next/link'

interface BlogItemProps {
  blog: IAllPostWithAuthor
}

export default function PostItem({ blog }: BlogItemProps) {
  return (
    <article
      title='Detail post'
      className='relative w-full max-w-md min-h-[338px] mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm'
    >
      <Link href={`${PATH_ROUTER.POST}/${blog.id}`}>
        <div className='overflow-hidden rounded-t-md'>
          {blog.thumbnail ? (
            <img
              src={blog.thumbnail}
              loading='lazy'
              alt={blog.title}
              className='w-full object-cover h-48 rounded-t-md hover:scale-110 duration-300'
            />
          ) : (
            <div className='flex items-center justify-center max-w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700'>
              <svg
                className='w-10 h-10 text-gray-200 dark:text-gray-600'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 18'
              >
                <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
              </svg>
            </div>
          )}
        </div>
        <div className='flex blog-center mt-2 pt-3 ml-4 mr-2'>
          <div className='flex-none w-10 h-10 rounded-full'>
            <Avatar src={blog.blogger.avatar} />
          </div>
          <div className='ml-3'>
            <span className='block text-gray-900 dark:text-white'>{blog.blogger.name}</span>
            <span className='block text-gray-400 dark:text-white text-sm'>{formatDateFromISO(blog.createdAt)}</span>
          </div>
        </div>
        <div className='pt-3 ml-4 mr-2 mb-3'>
          <h3 className='text-xl text-gray-900 dark:text-white line-clamp-2'>{blog.title}</h3>
        </div>
      </Link>
    </article>
  )
}
