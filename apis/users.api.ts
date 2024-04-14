import { IAuthSuccess, ILoginForm, IProfileUser, IRegisterForm, IUpdateProfile } from '@/interfaces/users.interface'
import axios from 'axios'
import api, { URL } from './api'
import { MessageResponse } from '@/interfaces/response.interface'

export const registerApi = async (data: IRegisterForm) => {
  const res = await axios.post<IAuthSuccess>(`${URL}/auth/register`, data)
  return res.data
}

export const loginApi = async (data: ILoginForm) => {
  const res = await axios.post<IAuthSuccess>(`${URL}/auth/login`, data)
  return res.data
}

export const logoutApi = async () => {
  const refresh_token = localStorage.getItem('refresh_token')
  const res = await api.post<MessageResponse>(`${URL}/auth/logout`, {
    refresh_token
  })
  return res.data
}

export const getIProfileUserApi = async () => {
  const res = await api.get<IProfileUser>(`${URL}/bloggers/profile`)
  return res.data
}

export const updateProfileApi = async (data: IUpdateProfile) => {
  const res = await api.patch<MessageResponse>(`${URL}/bloggers`, data)
  return res.data
}
