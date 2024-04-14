'use client'
import { deleteImagesApi, uploadImageApi } from '@/apis/medias.api'
import { updateProfileApi } from '@/apis/users.api'
import { AuthContext, AuthContextType } from '@/app/(auth)/_components/AuthContextProvider'
import { IUpdateProfileSchema } from '@/common/schemas/users.schema'
import Avatar from '@/components/Avatar'
import BreadCrumb from '@/components/BreadCrumb'
import Input from '@/components/Input'
import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { PATH_ROUTER } from '@/common/constants/route.constant'
import { ErrorResponse } from '@/interfaces/response.interface'
import { IUpdateProfile } from '@/interfaces/users.interface'
import { getErrorFromResponse } from '@/lib/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Profile() {
  const { auth, setAuth } = useContext(AuthContext) as AuthContextType
  const [changeImageLoading, setChangeImageLoading] = useState(false)

  // Initialize react hook form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUpdateProfile>({
    defaultValues: {
      name: auth.profile.name,
      email: auth.profile.email,
      address: auth.profile.address,
      birthday: new Date(auth.profile.birthday || '').toLocaleString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    },
    resolver: yupResolver(IUpdateProfileSchema)
  })

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: IUpdateProfile) => updateProfileApi(data)
  })

  // Upload image mutation
  const uploadImageMutation = useMutation({
    mutationFn: (data: File) => uploadImageApi(data)
  })

  // Delete image mutation
  const deleteImageMutation = useMutation({
    mutationFn: (urls: string[]) => deleteImagesApi(urls)
  })

  // Active event for avatar
  const avatarRef = useRef<HTMLInputElement>(null)
  const handleClickAvatarButton = () => {
    if (avatarRef.current) {
      avatarRef.current.click()
    }
  }

  const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (file) {
        setChangeImageLoading(true)
        // Upload new image
        const { data: newImage } = await uploadImageMutation.mutateAsync(file)
        // Update profile
        const { message } = await updateProfileMutation.mutateAsync({ avatar: newImage.url })
        // Delete old image
        if (auth.profile.avatar) {
          await deleteImageMutation.mutateAsync([auth.profile.avatar])
        }
        // Success
        toast({
          title: message as string
        })
        setChangeImageLoading(false)
        return setAuth((prev) => ({ ...prev, profile: { ...prev.profile, avatar: newImage.url } }))
      }
    } catch (error: ErrorResponse | any) {
      toast({
        title: getErrorFromResponse(error),
        variant: 'destructive'
      })
    }
  }

  // Handle submit form and call api
  const handleSaveForm = async (data: IUpdateProfile) => {
    try {
      if (data.birthday == '') {
        data.birthday = null
      }
      const { message } = await updateProfileMutation.mutateAsync(data)
      // Success
      toast({
        title: message as string
      })
      return setAuth((prev) => ({ ...prev, profile: { ...prev.profile, ...data } }))
    } catch (error: ErrorResponse | any) {
      toast({
        title: getErrorFromResponse(error),
        variant: 'destructive'
      })
    }
  }

  return (
    <main className='container mx-auto px-4'>
      <BreadCrumb nextRoute={{ name: 'Profile', path: PATH_ROUTER.PROFILE }} />

      <div
        className='rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-xl mx-auto my-10'
        data-v0-t='card'
      >
        <div className='flex flex-col space-y-1.5 p-6'>
          <h3 className='text-2xl font-semibold leading-none tracking-tight'>User Profile</h3>
          <p className='text-sm text-muted-foreground'>Update your profile information.</p>
        </div>
        <div className='p-6'>
          <div className='flex items-center gap-3 mb-4'>
            <span className='relative flex items-center justify-center shrink-0 overflow-hidden rounded-full'>
              <Avatar src={auth.profile.avatar} iconSize={80} className='flex h-24 w-24 rounded-full bg-muted' />
              {changeImageLoading && (
                <div className='absolute inset-0 grid place-items-center z-50 bg-gray-800 bg-opacity-50'>
                  <Spinner className='fill-emerald-500' />
                </div>
              )}
            </span>
            <div>
              <Button
                className='inline-flex bg-emerald-500 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-emerald-500/90 h-10 px-4 py-2'
                type='button'
                onClick={handleClickAvatarButton}
              >
                <label htmlFor='avatar' className='cursor-pointer flex items-center'>
                  Change Avatar
                  <input
                    type='file'
                    ref={avatarRef}
                    onChange={(e) => handleChangeAvatar(e)}
                    name='avatar'
                    className='opacity-0 w-0 h-0'
                  />
                </label>
              </Button>
            </div>
          </div>
          {/* Form input */}
          <form onSubmit={handleSubmit(handleSaveForm)} className='space-y-4'>
            <div className='space-y-2'>
              <label
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                htmlFor='name'
              >
                Name
              </label>
              <Input id='name' placeholder='Enter your name' register={register('name')} errors={errors.name} />
            </div>
            <div className='space-y-2'>
              <label
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                htmlFor='email'
              >
                Email
              </label>
              <Input
                type='email'
                classCustom='disabled:bg-gray-200'
                id='email'
                placeholder='Enter your email'
                register={register('email')}
                disabled
              />
            </div>
            <div className='space-y-2'>
              <label
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                htmlFor='birthday'
              >
                Birthday
              </label>
              <Input
                type='date'
                id='birthday'
                placeholder='Enter your birthday'
                register={register('birthday')}
                errors={errors.birthday}
              />
            </div>
            <div className='space-y-2'>
              <label
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                htmlFor='address'
              >
                Address
              </label>
              <Input
                id='address'
                placeholder='Enter your address'
                register={register('address')}
                errors={errors.address}
              />
            </div>

            <div className='flex items-center p-6'>
              <Button className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-500 text-primary-foreground hover:bg-emerald-500/90 h-10 px-4 py-2 ml-auto'>
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
