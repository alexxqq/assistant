'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../widgets/user/lib/useAuth'
import Loader from '@/src/shared/ui/loader'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter()
  const { user, loading, error } = useAuth()
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <Loader/>
  }

  if (error) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
