import { ROLE } from '@/common/constants/role.constant'
import { DataResponse, DataResponseWithPagination } from './response.interface'

export interface IRegisterForm {
  name: string
  email: string
  password: string
  confirm_password: string
}

export interface ILoginForm {
  email: string
  password: string
}

export interface IUser {
  id: string
  name: string
  email: string
  role: ROLE
  avatar: string | null
  address: string | null
  birthday: string | null
  createdAt: string
  updatedAt: string
}

export interface IUpdateProfile {
  name?: string
  email?: string
  address?: string | null
  birthday?: string | null
  avatar?: string | null
}

export type IAuthSuccess = DataResponse<{
  access_token: string
  refresh_token: string
}>

export type IRefreshTokenSuccess = DataResponse<{
  access_token: string
}>

export type IProfileUser = DataResponse<{
  blogger: IUser
}>

export interface IUserInfoForAdmin extends Pick<IUser, 'id' | 'name' | 'email' | 'role'> {}

export type IUserInfoForAdminResponse = DataResponseWithPagination<IUserInfoForAdmin[]>

export interface IBloggerFilter {
  limit: number
  page: number
  searchNameTerm?: string
}
