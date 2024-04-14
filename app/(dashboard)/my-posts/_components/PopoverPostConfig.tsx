'use client'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import PostSideFeature from '../../_components/PostSideFeature'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deletePostApi, getMyPostsApi, getPostByIdApi } from '@/apis/posts.api'
import { useContext, useState } from 'react'
import { FilterContext, FilterContextType } from '@/components/FilterContextProvider'
import { IPostFilter } from '@/interfaces/posts.interface'

interface PopoverPostConfigProps {
  id: string
}

export default function PopoverPostConfig({ id }: PopoverPostConfigProps) {
  const queryClient = useQueryClient()
  const { myPostFilters } = useContext(FilterContext) as FilterContextType<IPostFilter>
  const [isOpen, setIsOpen] = useState(false)

  const { data: post } = useQuery({
    queryKey: ['post'],
    queryFn: () => getPostByIdApi(id)
  })

  const deletePostMutation = useMutation({
    mutationFn: (id: string) => deletePostApi(id),
    onSuccess: () => {
      queryClient.prefetchQuery({
        queryKey: ['my-posts', myPostFilters.filters],
        queryFn: () => getMyPostsApi(myPostFilters.queryParams)
      })
    }
  })

  const handleDeletePost = () => {
    deletePostMutation.mutate(id)
  }

  return (
    <ul>
      <li className='px-2 py-1 cursor-pointer hover:bg-gray-200 rounded'>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className='flex items-center space-x-2 w-full'>
            <FaRegEdit size={18} color='blue' />
            <span className='text-sm'>Edit</span>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px] min-w-[800px] p-9 h-[90vh]'>
            <ScrollArea className='w-full h-full'>
              {post && <PostSideFeature isUpdate id={id} post={post} setIsOpen={setIsOpen} />}
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </li>
      <li className='px-2 py-1 cursor-pointer hover:bg-gray-200 rounded'>
        <div className='flex items-center space-x-2 w-full' onClick={handleDeletePost}>
          <FaRegTrashAlt size={17} color='red' />
          <span className='text-sm'>Delete</span>
        </div>
      </li>
    </ul>
  )
}
