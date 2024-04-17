'use client'
import { Button } from '@/components/ui/button'
import Editor from './Editor'
import { useState } from 'react'
import Input from '@/components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ICreatePostSchema } from '@/common/schemas/posts.schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPostApi, updatePostApi } from '@/apis/posts.api'
import { ErrorResponse, MessageResponse } from '@/interfaces/response.interface'
import { toast } from '@/components/ui/use-toast'
import { getErrorFromResponse } from '@/lib/utils'
import { uploadImageApi } from '@/apis/medias.api'
import { ICreatePostForm, ICreatePostSuccess, IGetPostByIdSuccess, IUpdatePostForm } from '@/interfaces/posts.interface'
import Spinner from '@/components/Spinner'
import ContentSuggestion from './ContentSuggestion'

interface PostSideFeatureProps {
  isUpdate?: boolean
  id?: string
  post?: IGetPostByIdSuccess
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface IPostData {
  title: string
  thumbnail?: any
}

export default function PostSideFeature({ isUpdate, id, post, setIsOpen }: PostSideFeatureProps) {
  const queryClient = useQueryClient()

  // Content post
  const [content, setContent] = useState(post?.data.content || '')

  // Initialize react hook form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<IPostData>({
    resolver: yupResolver(ICreatePostSchema),
    defaultValues: {
      title: post?.data.title || '',
      thumbnail: ''
    }
  })

  // Upload image mutation
  const uploadImageMutation = useMutation({
    mutationFn: (data: File) => uploadImageApi(data)
  })

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: (data: ICreatePostForm) => createPostApi(data),
    onError: (error: ErrorResponse) => {
      setIsOpen(false)
    }
  })

  // Update post mutation
  const updatePostMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdatePostForm }) => updatePostApi({ id, data })
  })

  const handleSubmitForm = async (data: IPostData) => {
    try {
      // Upload image before create post
      const postData = {
        ...data,
        content
      }
      if (data.thumbnail[0]) {
        console.log(data.thumbnail[0])

        const imageResponse = await uploadImageMutation.mutateAsync(data.thumbnail[0])
        postData.thumbnail = imageResponse.data.url
      } else {
        delete postData.thumbnail
      }
      // Create, update post and fetch data again
      let postResponse: ICreatePostSuccess | MessageResponse
      if (isUpdate && id && post) {
        postResponse = await updatePostMutation.mutateAsync({ id: id, data: postData })
      } else {
        postResponse = await createPostMutation.mutateAsync(postData)
      }

      // Reset form if create post
      if (!isUpdate) {
        setContent('')
        reset()
      }
      // Show toast
      toast({
        title: postResponse.message as string
      })
      // Close dialog
      setIsOpen(false)

      // Reload page
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    } catch (error: any | ErrorResponse) {
      toast({
        title: getErrorFromResponse(error),
        variant: 'destructive'
      })
    }
  }

  console.log(watch('thumbnail'))

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div>
        <label htmlFor='title' className='font-bold'>
          Title
        </label>
        <Input
          id='title'
          type='text'
          register={register('title')}
          errors={errors?.title}
          classCustom='dark:bg-transparent dark:focus:bg-transparent dark:text-white'
        />
      </div>
      <div className='mt-5'>
        <label htmlFor='thumbnail' className='font-bold'>
          Thumbnail
        </label>
        <div>
          <Input
            className='block py-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
            id='file_input'
            type='file'
            register={register('thumbnail')}
            errors={errors?.thumbnail}
          />
          {watch('thumbnail') && (
            <div className='mt-2'>
              <img src={URL.createObjectURL(watch('thumbnail')[0])} alt='thumbnail' />
            </div>
          )}
        </div>
      </div>
      <div className='mt-5'>
        <div className='flex space-x-3 mb-5'>
          <h2 className='font-bold'>Content</h2>
          <ContentSuggestion title={watch('title')} setContent={setContent} />
        </div>
        <Editor content={content} setContent={setContent} />
      </div>
      <div className='flex justify-start'>
        <Button variant='outline' className='border-emerald-500 hover:bg-emerald-500 hover:text-white mt-3'>
          <div className='flex items-center space-x-1'>
            {createPostMutation.isPending ||
              (updatePostMutation.isPending && <Spinner className='animate-spin w-4 h-4' />)}
            <span>{isUpdate ? 'Update' : 'Create'}</span>
          </div>
        </Button>
      </div>
    </form>
  )
}
