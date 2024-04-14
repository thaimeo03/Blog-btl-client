'use client'

import LoadingPage from '@/components/LoadingPage'
import { PATH_ROUTER } from '@/common/constants/route.constant'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function GoogleAuth({ children }: { children: React.ReactNode }) {
  const [isGoogleAuth, setIsGoogleAuth] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.has('access_token') && searchParams.has('refresh_token')) {
      const access_token = searchParams.get('access_token') as string
      const refresh_token = searchParams.get('refresh_token') as string

      // Store token
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)

      router.push(PATH_ROUTER.HOME)
      return setIsGoogleAuth(true)
    } else {
      return setIsGoogleAuth(true)
    }
  }, [searchParams])

  return isGoogleAuth ? <>{children}</> : <LoadingPage />
}
