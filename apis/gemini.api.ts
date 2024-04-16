import axios from 'axios'
import { IGeminiContent, IGeminiResponse } from '../interfaces/gemini.interface'

const axiosInstance = axios.create({
  baseURL: 'https://generativelanguage.googleapis.com'
})

export const sendMessageGeminiApi = async (content: IGeminiContent) => {
  const res = await axiosInstance.post<IGeminiResponse>(
    `/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
    content
  )

  return res.data
}
