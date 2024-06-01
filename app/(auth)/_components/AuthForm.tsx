'use client'
import { PATH_ROUTER } from '@/common/constants/route.constant'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import Input from '../../../components/Input'
import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ILoginFormSchema, IRegisterFormSchema } from '@/common/schemas/users.schema'
import { useMutation } from '@tanstack/react-query'
import { IAuthSuccess } from '@/interfaces/users.interface'
import { loginApi, registerApi } from '@/apis/users.api'
import { ErrorResponse } from '@/interfaces/response.interface'
import { useToast } from '../../../components/ui/use-toast'
import { getErrorFromResponse } from '@/lib/utils'
import { getGoogleAuthUrl } from '@/common/configs/oauth.config'

function saveToken(result: IAuthSuccess) {
  localStorage.setItem('access_token', result.data.access_token)
  localStorage.setItem('refresh_token', result.data.refresh_token)
}

export default function AuthForm() {
  const pathName = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  // Check if pathName is login or register
  const isLogin = pathName.includes(PATH_ROUTER.LOGIN)
  const getInfoByRole = ({ registerInfo, loginInfo }: { registerInfo: any; loginInfo: any }) => {
    return isLogin ? loginInfo : registerInfo
  }

  // Initialize react hook form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({
    resolver: yupResolver(isLogin ? ILoginFormSchema : IRegisterFormSchema)
  })

  // Handle submit form and call api
  // Create auth mutation instead of login and register mutation
  const authMutation = useMutation({
    mutationFn: (data: any) => (isLogin ? loginApi(data) : registerApi(data)),
    onSuccess: (result) => {
      saveToken(result)
      router.push(PATH_ROUTER.HOME)
    },
    onError: (error: ErrorResponse) => {
      toast({
        title: getErrorFromResponse(error),
        variant: 'destructive'
      })
    }
  })

  const handleSubmitForm = (data: any) => {
    authMutation.mutate(data)
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-300'>
      <div className='text-red-500'>Accout admin: thai@gmail.com 123456</div>
      <div className='flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md'>
        <div className='font-medium self-center text-xl sm:text-2xl uppercase text-gray-800'>
          {getInfoByRole({ registerInfo: 'Create New Account', loginInfo: 'Login To Your Account' })}
        </div>
        <Link
          href={getGoogleAuthUrl()}
          className='flex justify-center mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200'
        >
          <div className='flex space-x-2 items-center'>
            <FcGoogle size={18} />
            <span>Login with Google</span>
          </div>
        </Link>
        <div className='relative mt-10 h-px bg-gray-300'>
          <div className='absolute left-0 top-0 flex justify-center w-full -mt-2'>
            <span className='bg-white px-4 text-xs text-gray-500 uppercase'>
              {getInfoByRole({ registerInfo: 'Or create a new account', loginInfo: 'Or Login With Email' })}
            </span>
          </div>
        </div>
        <div className='mt-10'>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            {getInfoByRole({
              registerInfo: (
                <div className='flex flex-col mb-6'>
                  <label htmlFor='name' className='mb-1 text-xs sm:text-sm tracking-wide text-gray-600'>
                    Name:
                  </label>
                  <div className='relative'>
                    <div className='inline-flex items-center justify-center absolute z-20 left-0 top-0 h-full w-10 text-gray-400'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        className='-6 h-6'
                      >
                        <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path>
                        <circle cx='9' cy='7' r='4'></circle>
                        <path d='M23 21v-2a4 4 0 0 0-3-3.87'></path>
                        <path d='M16 3.13a4 4 0 0 1 0 7.75'></path>
                      </svg>
                    </div>
                    <Input
                      id='name'
                      type='text'
                      placeholder='Name'
                      classCustom='pl-10'
                      register={register('name')}
                      errors={errors?.name}
                    />
                  </div>
                </div>
              ),
              loginInfo: null
            })}
            <div className='flex flex-col mb-6'>
              <label htmlFor='email' className='mb-1 text-xs sm:text-sm tracking-wide text-gray-600'>
                E-Mail Address:
              </label>
              <div className='relative'>
                <div className='inline-flex items-center justify-center absolute z-20 left-0 top-0 h-full w-10 text-gray-400'>
                  <svg className='h-6 w-6' fill='none' strokeWidth={2} viewBox='0 0 24 24' stroke='currentColor'>
                    <path d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
                  </svg>
                </div>
                <Input
                  id='email'
                  type='text'
                  placeholder='E-Mail address'
                  classCustom='pl-10'
                  register={register('email')}
                  errors={errors?.email}
                />
              </div>
            </div>
            <div className='flex flex-col mb-6'>
              <label htmlFor='password' className='mb-1 text-xs sm:text-sm tracking-wide text-gray-600'>
                Password:
              </label>
              <div className='relative'>
                <div className='inline-flex items-center justify-center absolute z-20 left-0 top-0 h-full w-10 text-gray-400'>
                  <span>
                    <svg className='h-6 w-6' fill='none' strokeWidth={2} viewBox='0 0 24 24' stroke='currentColor'>
                      <path d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                    </svg>
                  </span>
                </div>
                <Input
                  id='password'
                  type='password'
                  placeholder='Password'
                  classCustom='pl-10'
                  register={register('password')}
                  errors={errors?.password}
                />
              </div>
            </div>
            {getInfoByRole({
              registerInfo: (
                <div className='flex flex-col mb-6'>
                  <label htmlFor='confirm_password' className='mb-1 text-xs sm:text-sm tracking-wide text-gray-600'>
                    Confirm password:
                  </label>
                  <div className='relative'>
                    <div className='inline-flex items-center justify-center absolute z-20 left-0 top-0 h-full w-10 text-gray-400'>
                      <span>
                        <svg className='h-6 w-6' fill='none' strokeWidth={2} viewBox='0 0 24 24' stroke='currentColor'>
                          <path d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                        </svg>
                      </span>
                    </div>
                    <Input
                      id='confirm_password'
                      type='password'
                      placeholder='Confirm password'
                      classCustom='pl-10'
                      register={register('confirm_password')}
                      errors={errors?.confirm_password}
                    />
                  </div>
                </div>
              ),
              loginInfo: null
            })}
            <div className='flex items-center mb-6 -mt-2'>
              <div className='flex ml-auto'>
                <Link href='#' className='inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700'>
                  Forgot Your Password?
                </Link>
              </div>
            </div>
            <div className='flex w-full'>
              <button
                type='submit'
                className='flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in'
              >
                <span className='mr-2 uppercase'>
                  {getInfoByRole({ loginInfo: 'Login', registerInfo: 'Register' })}
                </span>
                <span>
                  <svg className='h-6 w-6' fill='none' strokeWidth={2} viewBox='0 0 24 24' stroke='currentColor'>
                    <path d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
        <div className='flex justify-center items-center mt-6'>
          <Link
            href={getInfoByRole({ loginInfo: PATH_ROUTER.REGISTER, registerInfo: PATH_ROUTER.LOGIN })}
            className='inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center'
          >
            <span>
              <svg className='h-6 w-6' fill='none' strokeWidth={2} viewBox='0 0 24 24' stroke='currentColor'>
                <path d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
              </svg>
            </span>
            <span className='ml-2'>
              {getInfoByRole({ loginInfo: "You don't have an account", registerInfo: 'Do you have an account?' })}
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
