'use client'
import { Button } from '@/components/ui/button'
import CommentBox from './CommentBox'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { createCommentApi, getAllCommentsApi } from '@/apis/comments.api'
import { useState } from 'react'
import { ICommentBody } from '@/interfaces/comments.interface'

export default function CommentSide() {
  const params = useParams()
  const queryClient = useQueryClient()

  const [content, setContent] = useState('')

  const { data } = useQuery({
    queryKey: ['comments'],
    queryFn: () => getAllCommentsApi(params.id as string)
  })

  const createCommentMutation = useMutation({
    mutationFn: (data: { data: ICommentBody; blogId: string }) => createCommentApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    createCommentMutation.mutate({ data: { content }, blogId: params.id as string })
    setContent('')
  }

  return (
    <div className='my-10'>
      <div className='rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-screen-md mx-auto'>
        <div className='flex flex-col p-6 gap-4'>
          <div className='grid gap-1.5'>
            <div className='flex flex-col space-y-1.5 p-6 pb-0'>
              <div>Leave a comment</div>
              <p className='text-sm leading-none truncate text-gray-500 dark:text-gray-400'>
                Your comment will be visible to all members.
              </p>
            </div>
            <form onSubmit={handleSubmit} className='p-6 pt-0 grid gap-1.5'>
              <textarea
                className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]'
                placeholder='Enter your comment here.'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                defaultValue={''}
              />
              <div className='flex items-center gap-2'>
                <Button type='submit'>Comment</Button>
              </div>
            </form>
          </div>
          <div className='grid gap-2'>
            {data?.data && data.data.comments.map((comment) => <CommentBox key={comment.id} comment={comment} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
