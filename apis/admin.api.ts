import axios from 'axios'
import api, { URL } from './api'
import { MessageResponse } from '@/interfaces/response.interface'
import { IBloggerFilter, IUserInfoForAdminResponse } from '@/interfaces/users.interface'
import { convertObjToQueryString } from '@/lib/utils'

export const getAllBloggersApi = async (bloggerFilters: IBloggerFilter) => {
  const queryParams = convertObjToQueryString(bloggerFilters)

  const res = await api.get<IUserInfoForAdminResponse>(`${URL}/admin/bloggers?${queryParams}`)

  return res.data
}
