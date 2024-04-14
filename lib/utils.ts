import { ErrorResponse, IPagination } from '@/interfaces/response.interface'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getErrorFromResponse = (error: ErrorResponse) => {
  if (error.response) {
    if (typeof error.response.data.message === 'string') {
      return error.response.data.message
    } else {
      return error.response.data.message[0]
    }
  }
  return 'Something went wrong'
}

export const formatDateFromISO = (date: string) => {
  const dateObject = new Date(date)

  const formattedDate = dateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

  return formattedDate
}

export const formatCommentDateTime = (date: string) => {
  const dateObject = new Date(date)
  const dateCurrent = new Date()

  const dateObjectFormatted = formatDateFromISO(date)
  const dateCurrentFormatted = formatDateFromISO(dateCurrent.toISOString())

  if (dateObjectFormatted === dateCurrentFormatted) {
    return dateObject.toLocaleTimeString('en-US', {
      timeZone: 'UTC',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  return dateObjectFormatted
}

export const pagesValue = (pagination: IPagination) => {
  const totalPage = pagination.total_page
  const pageNumbers: number[] = []

  if (totalPage <= 0 || pagination.current_page <= 0 || pagination.current_page > totalPage) {
    return pageNumbers // Trang hoặc tổng số trang không hợp lệ
  }

  if (totalPage <= 3) {
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i)
    }
  } else {
    if (pagination.current_page === 1) {
      pageNumbers.push(1, 2, 3)
    } else if (pagination.current_page === totalPage) {
      pageNumbers.push(pagination.current_page - 2, pagination.current_page - 1, pagination.current_page)
    } else {
      pageNumbers.push(pagination.current_page - 1, pagination.current_page, pagination.current_page + 1)
    }
  }

  return pageNumbers
}

export const convertObjToQueryString = <T>(obj: T) => {
  const res = new URLSearchParams(obj as Record<string, any>).toString()
  return res
}
