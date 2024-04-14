import { DataResponse } from './response.interface'

interface ICommentBlogger {
  id: string
  name: string
  avatar: string | null
}

export interface IComment {
  id: string
  content: string
  createdAt: string
  blogger: ICommentBlogger
}

export type IGetCommentsSuccess = DataResponse<{
  comments: IComment[]
}>

export interface ICommentBody {
  content: string
}
