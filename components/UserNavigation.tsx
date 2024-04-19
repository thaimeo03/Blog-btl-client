'use client'
import { logoutApi } from '@/apis/users.api'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PATH_ROUTER } from '@/common/constants/route.constant'
import { ErrorResponse } from '@/interfaces/response.interface'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from './ui/use-toast'
import { getErrorFromResponse } from '@/lib/utils'
import { AuthContext, AuthContextType } from '@/app/(auth)/_components/AuthContextProvider'
import { useContext } from 'react'
import { IUser } from '@/interfaces/users.interface'
import { FaRegUserCircle } from 'react-icons/fa'
import Link from 'next/link'

export default function UserNavigation() {
  const { auth, setAuth } = useContext(AuthContext) as AuthContextType
  // Create a mutation to logout
  const logoutMutation = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      window.location.href = PATH_ROUTER.LOGIN
      return setAuth({
        isAuth: false,
        profile: {} as IUser
      })
    },
    onError: (error: ErrorResponse) => {
      toast({
        title: getErrorFromResponse(error),
        variant: 'destructive'
      })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <Popover>
      <PopoverTrigger className='flex items-center lg:order-2'>
        <button
          type='button'
          className='flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0'
          id='user-menu-button'
          aria-expanded='false'
        >
          <span className='sr-only'>Open user menu</span>
          {auth.profile.avatar ? (
            <img className='w-9 h-9 rounded-full object-cover' src={auth.profile.avatar} alt='user photo' />
          ) : (
            <FaRegUserCircle size={36} color='white' />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-56'>
        <div className='z-50 text-base list-none bg-gray-100 rounded divide-y divide-gray-300 shadow dark:bg-gray-700 dark:divide-gray-600'>
          <div className='py-3 px-4'>
            <span className='block text-sm font-semibold text-gray-900 dark:text-white first-letter:uppercase'>
              {auth.profile.name}
            </span>
            <span className='block text-sm text-gray-500 truncate dark:text-gray-400'>{auth.profile.email}</span>
          </div>
          <ul className='py-1 text-gray-500 dark:text-gray-400' aria-labelledby='dropdown'>
            <li className='cursor-pointer'>
              <Link
                href={PATH_ROUTER.PROFILE}
                className='block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white'
              >
                My profile
              </Link>
            </li>
            <li className='cursor-pointer'>
              <Link
                href={PATH_ROUTER.MY_POSTS}
                className='block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white'
              >
                My blogs
              </Link>
            </li>
            <li className='cursor-pointer'>
              <div
                onClick={handleLogout}
                className='block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white'
              >
                Log out
              </div>
            </li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  )
}
