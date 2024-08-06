'use client'

import { startTransition, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { addMemberToSystem } from '@/actions/addMember'
import { Header } from '@/components/auth/header'
import { Card, CardHeader } from '@/components/ui/card'
import { login } from '@/actions/login'
import { toast } from 'sonner'

export interface ExternalSecretProps {
  encryptedData: string
  iv: string
  secretKey: string
}

export default function AccessPage() {
  const searchParams = useSearchParams()
  const [account, setAccount] = useState<
    { username: string; password: string } | undefined
  >(undefined)

  const onAddMemberAutomatically = async () => {
    try {
      const secretData: ExternalSecretProps = {
        encryptedData: searchParams.get('encryptedData') ?? '',
        iv: searchParams.get('iv') ?? '',
        secretKey: searchParams.get('secretKey') ?? '',
      }
      const auth = await addMemberToSystem(secretData)
      if (auth) {
        setAccount({
          username: auth.response.user.username,
          password: auth.response.user.temperatePassword,
        })
      }
    } catch (error) {
      console.error('error: ', error)
    }
  }

  const onStartGame = async () => {
    if (!account) return
    const callbackUrl = searchParams?.get('callbackUrl')

    startTransition(async () => {
      login({ ...account }, callbackUrl)
        .then((data: any) => {
          if (data?.error) {
            toast.error(data?.error ?? 'Something went wrong! Please try again')
          }
          if (data?.success) {
            toast.success(data?.success ?? 'Start game successfully!')
          }
        })
        .catch(() => console.error('Something went wrong!'))
    })
  }

  return (
    <div className="w-full h-[100dvh] flex items-center justify-center">
      <Card className="max-w-[460px] w-full  shadow-md p-[32px] z-20 bg-black/60 border-solid border-2 border-white/30">
        <CardHeader className="p-0">
          <Header label={'Access from an external link'} />
        </CardHeader>
        {account ? (
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 text-md font-medium">
              <span>Username: </span>
              <span>{account.username}</span>
            </div>
            <div className="flex gap-4 text-md font-medium">
              <span>Password: </span>
              <span>{account.password}</span>
            </div>
            <span className="flex gap-4 text-md font-medium">
              PLease note your account for the next time.
            </span>
            <div className="input-group text-center mt-10">
              <button
                className="btn btn-submit disabled:pointer-events-none disabled:opacity-50"
                onClick={() => onStartGame()}
              >
                <span className="color-main">Continue</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="input-group text-center mt-10">
            <button
              className="btn btn-submit disabled:pointer-events-none disabled:opacity-50"
              onClick={() => onAddMemberAutomatically()}
            >
              <span className="color-main">Start Game</span>
            </button>
          </div>
        )}
      </Card>
    </div>
  )
}
