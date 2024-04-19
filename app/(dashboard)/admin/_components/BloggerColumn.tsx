'use client'

import { changeRole } from '@/apis/admin.api'
import { ROLE } from '@/common/constants/role.constant'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { ErrorResponse } from '@/interfaces/response.interface'
import { IChangeRole, IUserInfoForAdmin } from '@/interfaces/users.interface'
import { getErrorFromResponse } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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

      const queryClient = useQueryClient()

      const changeRoleMutation = useMutation({
        mutationFn: (data: IChangeRole) => changeRole(data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['bloggers_vertical_bar_chart'] })
          queryClient.invalidateQueries({ queryKey: ['bloggers_accounts'] })
        },
        onError: (error: ErrorResponse) => {
          toast({
            title: getErrorFromResponse(error),
            variant: 'destructive'
          })
        }
      })

      const handleClick = (data: IChangeRole) => {
        changeRoleMutation.mutate(data)
      }

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
            <DropdownMenuItem
              onClick={() => handleClick({ id: blogger.id, role: ROLE.USER })}
              className='my-2 cursor-pointer flex items-center space-x-1 justify-center'
            >
              {blogger.role === ROLE.USER && <Check size={16} />}
              <span>Blogger</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleClick({ id: blogger.id, role: ROLE.ADMIN })}
              className='my-2 cursor-pointer flex items-center space-x-1 justify-center'
            >
              {blogger.role === ROLE.ADMIN && <Check size={16} />}
              <span>Admin</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleClick({ id: blogger.id, role: ROLE.BANNED })}
              className='my-2 cursor-pointer flex items-center space-x-1 justify-center'
            >
              {blogger.role === ROLE.BANNED && <Check size={16} />}
              <span>Ban</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
