import { MessageResponse } from '@/interfaces/response.interface'
import api, { URL } from './api'
import { ICommentBody, IGetCommentsSuccess } from '@/interfaces/comments.interface'

export const getAllCommentsApi = async (blogId: string) => {
  const res = await api.get<IGetCommentsSuccess>(`${URL}/comments/blogs/${blogId}`)

  return res.data
}

export const createCommentApi = async ({ blogId, data }: { blogId: string; data: ICommentBody }) => {
  const res = await api.post<MessageResponse>(`${URL}/comments/blogs/${blogId}`, data)

  return res.data
}
