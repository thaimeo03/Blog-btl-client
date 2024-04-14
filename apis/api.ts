import { IRefreshTokenSuccess } from '@/interfaces/users.interface'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export const URL = process.env.NEXT_PUBLIC_BE_HOST as string

class Api {
  private api
  constructor() {
    this.api = axios.create({
      baseURL: URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async refreshToken(): Promise<string> {
    try {
      const refresh_token = localStorage.getItem('refresh_token')
      if (!refresh_token) throw new Error('No refresh token')
      const response = await axios.post<IRefreshTokenSuccess>(`${URL}/auth/refresh-token`, {
        refresh_token
      })

      const { access_token: new_access_token } = response.data.data
      localStorage.setItem('access_token', new_access_token)
      return new_access_token
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  /**
   * Sends a request with the access token.
   * @param config - The request configuration.
   * @returns The response from the server.
   * @throws Error if the request fails.
   */
  async sendRequestWithToken<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const token = localStorage.getItem('access_token')
    try {
      const response = await this.api({
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${token}` }
      })
      return response
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.status === 401) {
        const newToken = await this.refreshToken()
        if (newToken) {
          const response = await this.api({
            ...config,
            headers: { ...config.headers, Authorization: `Bearer ${newToken}` }
          })
          return response
        }
      }

      throw error
    }
  }

  /**
   * Sends a GET request with the access token.
   * @param url - The URL to send the request to.
   * @param config - The request configuration.
   * @returns The response from the server.
   * @throws Error if the request fails.
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.sendRequestWithToken<T>({ method: 'GET', url, ...config })
  }

  /**
   * Sends a POST request with the access token.
   * @param url - The URL to send the request to.
   * @param data - The data to send with the request.
   * @param config - The request configuration.
   * @returns The response from the server.
   * @throws Error if the request fails.
   */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.sendRequestWithToken<T>({ method: 'POST', url, data, ...config })
  }

  /**
   * Sends a PUT request with the access token.
   * @param url - The URL to send the request to.
   * @param data - The data to send with the request.
   * @param config - The request configuration.
   * @returns The response from the server.
   * @throws Error if the request fails.
   */
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.sendRequestWithToken<T>({ method: 'PUT', url, data, ...config })
  }

  /**
   * Sends a PATCH request with the access token.
   * @param url - The URL to send the request to.
   * @param data - The data to send with the request.
   * @param config - The request configuration.
   * @returns The response from the server.
   * @throws Error if the request fails.
   */
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.sendRequestWithToken<T>({ method: 'PATCH', url, data, ...config })
  }

  /**
   * Sends a DELETE request with the access token.
   * @param url - The URL to send the request to.
   * @param data - The data to send with the request.
   * @param config - The request configuration.
   * @returns The response from the server.
   * @throws Error if the request fails.
   */
  async delete<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.sendRequestWithToken<T>({ method: 'DELETE', url, data, ...config })
  }
}

const api = new Api()
export default api
