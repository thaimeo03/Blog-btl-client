'use client'

import { ROLE } from '@/common/constants/role.constant'
import { Button } from '@/components/ui/button'
import { IUserInfoForAdmin } from '@/interfaces/users.interface'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { Check, MoreHorizontal } from 'lucide-react'

export const columns: ColumnDef<IUserInfoForAdmin>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'role',
    header: 'Role'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const blogger = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-popover border border-red-600 p-2' align='end'>
            <DropdownMenuLabel className='font-semibold'>Change role</DropdownMenuLabel>
            <DropdownMenuSeparator className='border' />
            <DropdownMenuItem className='my-2 cursor-pointer flex items-center space-x-1 justify-center'>
              {blogger.role === ROLE.USER && <Check size={16} />}
              <span>Blogger</span>
            </DropdownMenuItem>
            <DropdownMenuItem className='my-2 cursor-pointer flex items-center space-x-1 justify-center'>
              {blogger.role === ROLE.ADMIN && <Check size={16} />}
              <span>Admin</span>
            </DropdownMenuItem>
            <DropdownMenuItem className='my-2 cursor-pointer flex items-center space-x-1 justify-center'>
              {blogger.role === ROLE.BANNED && <Check size={16} />}
              <span>Ban</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
