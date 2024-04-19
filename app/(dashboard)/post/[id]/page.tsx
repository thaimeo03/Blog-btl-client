'use client'
import { getPostByIdApi } from '@/apis/posts.api'
import Avatar from '@/components/Avatar'
import BreadCrumb from '@/components/BreadCrumb'
import Skeleton from '@/components/ui/Skeleton'
import { PATH_ROUTER } from '@/common/constants/route.constant'
import { formatDateFromISO } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import CommentSide from '../components/CommentSide'
import { useContext } from 'react'
import { AuthContext, AuthContextType } from '@/app/(auth)/_components/AuthContextProvider'
import { ROLE } from '@/common/constants/role.constant'
import { Button } from '@/components/ui/button'

export default function PostDetail({ params }: { params: { id: string } }) {
  const { auth } = useContext(AuthContext) as AuthContextType

  const { data: post, isFetching } = useQuery({
    queryKey: ['post'],
    queryFn: () => getPostByIdApi(params.id)
  })

  return (
    <div className='max-w-screen-xl mx-auto'>
      <BreadCrumb nextRoute={{ name: 'Post', path: PATH_ROUTER.POST }} />

      <main className='mt-10 relative'>
        {auth.profile.role === ROLE.ADMIN && (
          <div className='flex flex-col absolute right-0 top-0 gap-4'>
            <Button variant={'outline'}>Hide blog</Button>
            <Button variant={'destructive'}>Delete blog</Button>
          </div>
        )}

        {post && (
          <>
            <div className='mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative' style={{ height: '24em' }}>
              <div
                className='absolute left-0 bottom-0 w-full h-full z-10'
                style={{ backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7))' }}
              />
              <img
                src={post.data.thumbnail}
                className='absolute left-0 top-0 w-full h-full z-0 object-cover'
                alt={post.data.title}
              />
              <div className='p-4 absolute bottom-0 left-0 z-20'>
                <h2 className='text-4xl font-semibold text-gray-100 leading-tight'>{post.data.title}</h2>
                <div className='flex space-x-2 mt-3'>
                  <Avatar src={post.data.blogger.avatar} />
                  <div>
                    <p className='font-semibold text-gray-200 text-sm'> {post.data.blogger.name} </p>
                    <p className='font-semibold text-gray-400 text-xs'> {formatDateFromISO(post.data.updatedAt)} </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='px-4 lg:px-0 mt-10 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed'>
              <div className='dark:text-white' dangerouslySetInnerHTML={{ __html: post.data.content }}></div>
            </div>
          </>
        )}
        {isFetching && <Skeleton />}
      </main>
      {/* main ends here */}

      <CommentSide />
    </div>
  )
}
