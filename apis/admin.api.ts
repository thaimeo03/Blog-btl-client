import { IBlogsForAdminFilter, IGetAllBlogsForAdminResponse } from '@/interfaces/posts.interface'
import api, { URL } from './api'
import { IBloggerFilter, IUserInfoForAdminResponse } from '@/interfaces/users.interface'
import { convertObjToQueryString } from '@/lib/utils'

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
