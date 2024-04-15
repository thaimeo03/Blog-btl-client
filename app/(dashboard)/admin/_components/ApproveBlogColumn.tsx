'use client'

import { BLOG_STATUS, ROLE } from '@/common/constants/role.constant'
import { PATH_ROUTER } from '@/common/constants/route.constant'
import { Button } from '@/components/ui/button'
import { IBlogInfoForAdmin } from '@/interfaces/posts.interface'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { Check, Eye, MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const columns: ColumnDef<IBlogInfoForAdmin>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'createdAt',
    header: 'Created at'
  },
  {
    id: 'actions',
    header: 'View',
    cell: ({ row }) => {
      const router = useRouter()
      const blog = row.original

      const handleClick = () => {
        router.push(`${PATH_ROUTER.POST}/${blog.id}`)
      }

      return (
        <div
          onClick={handleClick}
          className='flex justify-center cursor-pointer hover:scale-125 hover:text-blue-400 p-2'
        >
          <Eye size={18} />
        </div>
      )
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const blog = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-popover border border-red-600 p-2' align='end'>
            <DropdownMenuItem className='my-2 cursor-pointer flex items-center space-x-1 justify-center'>
              {blog.status === BLOG_STATUS.PENDING && <Check size={16} />}
              <span>Pending</span>
            </DropdownMenuItem>
            <DropdownMenuItem className='my-2 cursor-pointer flex items-center space-x-1 justify-center'>
              {blog.status === BLOG_STATUS.ACCEPTED && <Check size={16} />}
              <span>Accept</span>
            </DropdownMenuItem>
            <DropdownMenuItem className='my-2 cursor-pointer flex items-center space-x-1 justify-center'>
              {blog.status === BLOG_STATUS.REJECTED && <Check size={16} />}
              <span>Reject</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
