import Avatar from '@/components/Avatar'
import { IComment } from '@/interfaces/comments.interface'
import { formatCommentDateTime } from '@/lib/utils'

interface CommentBoxProps {
  comment: IComment
}

export default function CommentBox({ comment }: CommentBoxProps) {
  return (
    <div className='flex items-center gap-4'>
      <div className='flex-shrink-0'>
        <Avatar src={comment.blogger.avatar || ''} />
      </div>
      <div className='grid gap-0.5'>
        <div className='flex items-center gap-2'>
          <h3 className='text-sm font-medium tracking-tighter'>{comment.blogger.name}</h3>
          <time className='text-sm text-gray-500 dark:text-gray-400'>{formatCommentDateTime(comment.createdAt)}</time>
        </div>
        <p className='text-sm text-gray-500 dark:text-gray-400'>{comment.content}</p>
      </div>
    </div>
  )
}
