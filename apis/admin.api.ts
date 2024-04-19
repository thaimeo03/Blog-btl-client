import {
  IBloggersQuantityAnalyticsResponse,
  IBlogsForAdminFilter,
  IBlogsQuantityAnalyticsResponse,
  IChangeBlogStatus,
  IGetAllBlogsForAdminResponse
} from '@/interfaces/posts.interface'
import api, { URL } from './api'
import { IBloggerFilter, IChangeRole, IUserInfoForAdminResponse } from '@/interfaces/users.interface'
import { convertObjToQueryString } from '@/lib/utils'
import { MessageResponse } from '@/interfaces/response.interface'
import { BLOG_STATUS } from '@/common/constants/role.constant'

export const getAllBloggersApi = async (bloggerFilters: IBloggerFilter) => {
  const queryParams = convertObjToQueryString(bloggerFilters)

  const res = await api.get<IUserInfoForAdminResponse>(`${URL}/admin/bloggers?${queryParams}`)

  return res.data
}

export const getAllBlogsForAdminApi = async (blogsForAdminFilters: IBlogsForAdminFilter) => {
  const queryParams = convertObjToQueryString(blogsForAdminFilters)

  const res = await api.get<IGetAllBlogsForAdminResponse>(`${URL}/admin/blogs?${queryParams}`)

  return res.data
}

export const changeBlogStatus = async ({ id, status }: IChangeBlogStatus) => {
  const res = await api.patch<MessageResponse>(`${URL}/admin/blogs/${id}`, { status })

  return res.data
}

export const changeRole = async ({ id, role }: IChangeRole) => {
  const res = await api.patch<MessageResponse>(`${URL}/admin/bloggers/${id}`, { role })

  return res.data
}

export const getBlogsQuantityAnalyticsApi = async () => {
  const res = await api.get<IBlogsQuantityAnalyticsResponse>(`${URL}/admin/blogs/analysis`)

  return res.data
}

export const getBloggersQuantityAnalyticsApi = async () => {
  const res = await api.get<IBloggersQuantityAnalyticsResponse>(`${URL}/admin/bloggers/analysis`)

  return res.data
}
