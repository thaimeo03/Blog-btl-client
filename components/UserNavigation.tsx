'use client'
import { logoutApi } from '@/apis/users.api'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PATH_ROUTER } from '@/constants/route.constant'
import { ErrorResponse } from '@/interfaces/response.interface'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from './ui/use-toast'
import { getErrorFromResponse } from '@/lib/utils'
import { AuthContext, AuthContextType } from '@/app/(auth)/_components/AuthContextProvider'
import { useContext } from 'react'
import { IUser } from '@/interfaces/users.interface'

export default function UserNavigation() {
  const { setAuth } = useContext(AuthContext) as AuthContextType
  const router = useRouter()
  // Create a mutation to logout
  const logoutMutation = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      router.push(PATH_ROUTER.LOGIN)
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
          className='flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
          id='user-menu-button'
          aria-expanded='false'
        >
          <span className='sr-only'>Open user menu</span>
          <img
            className='w-8 h-8 rounded-full'
            src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
            alt='user photo'
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-56'>
        <div className='z-50 text-base list-none bg-gray-100 rounded divide-y divide-gray-300 shadow dark:bg-gray-700 dark:divide-gray-600'>
          <div className='py-3 px-4'>
            <span className='block text-sm font-semibold text-gray-900 dark:text-white'>Neil sims</span>
            <span className='block text-sm text-gray-500 truncate dark:text-gray-400'>name@flowbite.com</span>
          </div>
          <ul className='py-1 text-gray-500 dark:text-gray-400' aria-labelledby='dropdown'>
            <li className='cursor-pointer'>
              <a
                href='#'
                className='block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white'
              >
                My profile
              </a>
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