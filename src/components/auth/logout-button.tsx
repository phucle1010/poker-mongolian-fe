'use client'

import { logout } from '@/actions/logout'
import { cn } from '@/lib/utils'
import userApi from '@/services/api/modules/user-api'
import { useSession } from 'next-auth/react'

interface LogoutButtonProps {
  children?: React.ReactNode
  className?: string
}

export const LogoutButton = ({ children, className }: LogoutButtonProps) => {
  const session = useSession()
  const onClick = async () => {
    if (!session.data?.user) return
    await userApi.logout({ userId: session.data.user.id })
    await logout()
  }

  return (
    <span onClick={onClick} className={cn('cursor-pointer', className)}>
      {children}
    </span>
  )
}
