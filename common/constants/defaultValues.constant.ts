import { IBlogsForAdminFilter, IPostFilter } from '@/interfaces/posts.interface'
import { IBloggerFilter } from '@/interfaces/users.interface'

export const postFiltersInitialValue = {
  limit: 6, // Could be change value based on screen size
  page: 1
} as IPostFilter

export const bloggerFiltersInitialValue = {
  limit: 6, // Could be change value based on screen size
  page: 1
} as IBloggerFilter

export const blogsFiltersInitialValue = {
  limit: 6, // Could be change value based on screen size
  page: 1
} as IBlogsForAdminFilter
