import {
  ICreatePostForm,
  ICreatePostSuccess,
  IGetAllPostsSuccess,
  IGetPostByIdSuccess,
  IUpdatePostForm
} from '@/interfaces/posts.interface'
import api, { URL } from './api'
import { MessageResponse } from '@/interfaces/response.interface'

export const createPostApi = async (data: ICreatePostForm) => {
  const res = await api.post<ICreatePostSuccess>(`${URL}/blogs`, data)
  return res.data
}

export const getAllPostsApi = async (filters: string) => {
  const res = await api.get<IGetAllPostsSuccess>(`${URL}/blogs?${filters}`)
  return res.data
}

export const getPostByIdApi = async (id: string) => {
  const res = await api.get<IGetPostByIdSuccess>(`${URL}/blogs/${id}`)
  return res.data
}

export const getMyPostsApi = async (filters: string) => {
  const res = await api.get<IGetAllPostsSuccess>(`${URL}/blogs/author?${filters}`)
  return res.data
}

export const updatePostApi = async ({ id, data }: { id: string; data: IUpdatePostForm }) => {
  const res = await api.patch<MessageResponse>(`${URL}/blogs/${id}`, data)
  return res.data
}

export const deletePostApi = async (id: string) => {
  const res = await api.delete<MessageResponse>(`${URL}/blogs/${id}`)
  return res.data
}
