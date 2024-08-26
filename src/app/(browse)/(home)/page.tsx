'use client'

import { useEffect, useState } from 'react'
import { Container } from './components/container'
import { HomeContent } from './components/home-content'

import '@/styles/css/styles.css'
import { useSession } from 'next-auth/react'
import userApi from '@/services/api/modules/user-api'
import { logout } from '@/actions/logout'
import {
  clearStorageToken,
  getStorageToken,
  saveStorageToken,
} from '@/utils/storage'
import { useCurrentUser } from '@/hooks/use-current-user'

export default function Page() {
  const { data: session } = useSession()
  const accessToken = getStorageToken()

  // Detect user close browser or switch to another tab
  // useEffect(() => {
  //   if (!accessToken && session?.user.token) {
  //     saveStorageToken(session.user.token)
  //   }

  //   const handleBeforeUnload = (event: any) => {
  //     var message = 'Are you sure you want to leave?'
  //     event.returnValue = message
  //     handleCloseGame()
  //     return message
  //   }

  //   const handleCloseGame = async () => {
  //     await lockUserOutOfGame()
  //   }

  //   window.addEventListener('beforeunload', handleBeforeUnload)
  //   window.addEventListener('visibilitychange', handleCloseGame)

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload)
  //     window.removeEventListener('visibilitychange', handleCloseGame)
  //   }
  // }, [])

  const lockUserOutOfGame = async () => {
    const currentUser = useCurrentUser()
    if (!currentUser) return
    await userApi.logout({ userId: currentUser.id })
    clearStorageToken()
    await logout()
  }

  return (
    <div className="home">
      <Container>
        <HomeContent />
      </Container>
    </div>
  )
}
