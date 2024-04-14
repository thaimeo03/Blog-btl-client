'use client'
import { useContext, useEffect } from 'react'
import { AuthContext, AuthContextType } from '../app/(auth)/_components/AuthContextProvider'
import { redirect } from 'next/navigation'
import { getIProfileUserApi } from '@/apis/users.api'
import { useQuery } from '@tanstack/react-query'
import { PATH_ROUTER } from '@/common/constants/route.constant'
import LoadingPage from './LoadingPage'

export default function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const { auth, setAuth } = useContext(AuthContext) as AuthContextType

  const { data, isSuccess, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getIProfileUserApi
  })

  useEffect(() => {
    if (isSuccess) {
      return setAuth({
        isAuth: true,
        profile: data.data.blogger
      })
    }

    if (isError) {
      return redirect(PATH_ROUTER.LOGIN)
    }
  }, [isSuccess, isError])

  return auth.isAuth ? <>{children}</> : <LoadingPage />
}
