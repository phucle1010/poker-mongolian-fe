'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useModal } from '@/store/use-modal-store'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useCurrentUser } from '@/hooks/use-current-user'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSocket } from '@/providers/socket-provider'
import playerApi from '@/services/api/modules/player-api'
import { useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { formatChipsAmount } from '@/utils/formatting'
import tableApi from '@/services/api/modules/table-api'

const formSchema = z.object({
  code: z.string(),
  pass: z.string(),
})

export const EnterTableModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const { roomId } = data
  const router = useRouter()
  const user = useCurrentUser()
  const { socket } = useSocket()
  const { update } = useSession()

  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const isModalOpen = isOpen && type === 'enterSpecificTable'

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
      pass: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!user) return router.push('/auth/login')
      setIsLoading(true)

      const { error: roomError, response: table } =
        await tableApi.checkTableSecret({
          code: values.code,
          pass: values.pass,
          roomId: roomId ?? '',
        })

      if (roomError) {
        setErrorMsg((roomError as any)?.message)
        return
      }

      const { error } = await playerApi.createPlayer({
        tableId: table.id,
        userId: user.id,
        socketId: socket.id,
        buyIn: table.minBuyIn,
      })

      if (error) {
        return
      }
      router.push(`/dashboard/table/${table.id}?roomId=${table.roomId}`)
      update()
      form.reset()
      onClose()
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setErrorMsg('')
    form.reset()
    onClose()
  }

  return (
    <div className={cn('modal', isModalOpen && 'show')}>
      <div className="modal_dark modal_close" onClick={handleClose}></div>
      <div className="modal_dialog sz-sm">
        <div className="modal_content ">
          <div className="modal_head">
            Өрөөний мэдээлэл
            <div className="btn_close modal_close" onClick={handleClose}>
              <span className="icon sz-24">
                <i className="icon_close"></i>
              </span>
            </div>
          </div>
          <div className="modal_body">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="row flex flex-space"
              >
                <div className="!mt-4">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="input-group">
                            <div className="wrap-input ">
                              <Input
                                className="w-full py-0 text-center"
                                type="text"
                                disabled={isLoading}
                                {...field}
                                placeholder="Өрөөний код"
                                onChange={e => {
                                  if (errorMsg) setErrorMsg('')
                                  field.onChange(e.target.value)
                                }}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="mt-0" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pass"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="input-group">
                            <div className="wrap-input ">
                              <Input
                                className="w-full py-0 text-center"
                                type="password"
                                disabled={isLoading}
                                {...field}
                                placeholder="Нууц үг"
                                onChange={e => {
                                  if (errorMsg) setErrorMsg('')
                                  field.onChange(e.target.value)
                                }}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="mt-0" />
                      </FormItem>
                    )}
                  />
                </div>
                {errorMsg && (
                  <div className="text-red-500 text-sm font-medium !mb-4">
                    {errorMsg}
                  </div>
                )}

                <div className="col-12 mt-2">
                  <button
                    type="submit"
                    className="btn_submit w-full"
                    disabled={isLoading}
                  >
                    <span>өглөг</span>
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
