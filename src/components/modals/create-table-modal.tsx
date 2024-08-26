'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Description, Field, Label, Select } from '@headlessui/react'
import { useModal } from '@/store/use-modal-store'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { formatChipsAmount } from '@/utils/formatting'
import tableApi from '@/services/api/modules/table-api'
import { useRouter } from 'next/navigation'
import { useCurrentUser } from '@/hooks/use-current-user'
import { Room } from '@/types'
import roomApi from '@/services/api/modules/room-api'
import { ChevronDownIcon } from 'lucide-react'

export const tableRequestSchema = z.object({
  name: z.string().min(1, {
    message: 'Өрөөний нэрийг оруулах шаардлагатай.',
  }),
  minBuyIn: z.number().min(0, {
    message: 'Хамгийн бага худалдан авалт 0-ээс их байх ёстой.',
  }),
  maxBuyIn: z.number().min(0, {
    message: 'Хамгийн их худалдан авалт 0-ээс их байх ёстой.',
  }),
  ante: z.number().min(0, {
    message: 'Ante 0-ээс их байх ёстой.',
  }),
  code: z.string().optional(),
  password: z.string().optional(),
  userId: z.string(),
  roomId: z.string(),
})

export type TableCreatorRequest = z.infer<typeof tableRequestSchema>

export const TableCreatorModal = () => {
  const router = useRouter()
  const user = useCurrentUser()
  const { isOpen, onClose, type, data } = useModal()
  const { rooms } = data
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const isModalOpen = isOpen && type === 'tableCreator'

  if (!user) return null

  const form = useForm({
    resolver: zodResolver(tableRequestSchema),
    defaultValues: {
      name: '',
      minBuyIn: 1000,
      maxBuyIn: 1000 * 100,
      ante: 1000 * 0.05,
      code: '',
      password: '',
      userId: user.id,
      roomId: rooms?.length ? rooms[0].id : '',
    },
  })

  useEffect(() => {
    if (!rooms || !isOpen) return
    form.setValue('roomId', rooms[0].id)
  }, [rooms, isOpen])

  const onSubmit = async (values: z.infer<typeof tableRequestSchema>) => {
    try {
      if (!user) return router.push('/auth/login')

      setIsLoading(true)
      const { error: tableError } = await tableApi.createTable({
        data: {
          ...values,
          userId: user.id,
        },
      })
      if (tableError) {
        setErrorMsg((tableError as any)?.message)
        return
      }

      handleClose()
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
      <div className="modal_dialog sz-md">
        <div className="modal_content ">
          <div className="modal_head">
            хүснэгт үүсгэх
            <div className="btn_close modal_close" onClick={handleClose}>
              <span className="icon sz-24">
                <i className="icon_close"></i>
              </span>
            </div>
          </div>
          <div className="modal_body">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(values => onSubmit(values))}
                className="row flex flex-space"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormControl>
                          <div className="input-group">
                            <div className="wrap-input ">
                              <div className="text-sm font-normal mb-1">
                                Хүснэгтийн нэр
                              </div>
                              <Input
                                className="w-full py-0 text-center"
                                type="text"
                                disabled={isLoading}
                                {...field}
                                onChange={e => {
                                  setErrorMsg('')
                                  field.onChange(e.target.value)
                                }}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="!-mt-3" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="roomId"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormControl>
                          <div className="input-group h-full">
                            <div className="wrap-input h-full flex flex-col">
                              <div className="text-sm font-normal mb-1.5">
                                Өрөө сонгох
                              </div>
                              <div className="relative flex-1">
                                <Select
                                  className={cn(
                                    'block w-full !h-full appearance-none rounded-md border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                                    '*:text-black'
                                  )}
                                  onChange={e => {
                                    setErrorMsg('')
                                    field.onChange(e.target.value)
                                  }}
                                  value={field.value}
                                >
                                  {rooms &&
                                    rooms.length &&
                                    rooms.map(r => (
                                      <option key={r.id} value={r.id}>
                                        {r.name}
                                      </option>
                                    ))}
                                </Select>
                                <ChevronDownIcon
                                  className="group pointer-events-none absolute top-1/2 -translate-y-1/2 right-2.5 size-4 "
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </div>
                        </FormControl>

                        <FormMessage className="!-mt-3" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="minBuyIn"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormControl>
                          <div className="input-group">
                            <div className="wrap-input ">
                              <div className="text-sm font-normal mb-1">
                                Хамгийн бага худалдан авалт
                              </div>
                              <Input
                                id="minBuyIn"
                                className="w-full py-0 text-center"
                                type="number"
                                min={0}
                                max={form.getValues('maxBuyIn')}
                                disabled={isLoading}
                                {...field}
                                onChange={e => {
                                  setErrorMsg('')
                                  field.onChange(+e.target.value || ' ')
                                }}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="!-mt-3" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maxBuyIn"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormControl>
                          <div className="input-group">
                            <div className="wrap-input ">
                              <div className="text-sm font-normal mb-1">
                                Хамгийн их худалдан авалт
                              </div>
                              <Input
                                id="maxBuyIn"
                                className="w-full py-0 text-center"
                                type="number"
                                min={form.getValues('minBuyIn')}
                                disabled={isLoading}
                                {...field}
                                onChange={e => {
                                  setErrorMsg('')
                                  field.onChange(+e.target.value || ' ')
                                }}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="!-mt-3" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ante"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormControl>
                          <div className="input-group">
                            <div className="wrap-input ">
                              <div className="text-sm font-normal mb-1">
                                Анте
                              </div>
                              <Input
                                id="ante"
                                className="w-full py-0 text-center"
                                type="number"
                                min={0}
                                max={form.getValues('minBuyIn')}
                                disabled={isLoading}
                                {...field}
                                onChange={e => {
                                  setErrorMsg('')
                                  field.onChange(+e.target.value || ' ')
                                }}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="!-mt-3" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormControl>
                          <div className="input-group">
                            <div className="wrap-input ">
                              <div className="text-sm font-normal mb-1">
                                Өрөөний код
                              </div>
                              <Input
                                className="w-full py-0 text-center"
                                type="text"
                                disabled={isLoading}
                                {...field}
                                onChange={e => {
                                  setErrorMsg('')
                                  field.onChange(e.target.value)
                                }}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="!-mt-3" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormControl>
                        <div className="input-group">
                          <div className="wrap-input ">
                            <div className="text-sm font-normal mb-1">
                              Нууц үг
                            </div>
                            <Input
                              className="w-full py-0 text-center"
                              type="password"
                              disabled={isLoading}
                              {...field}
                              onChange={e => {
                                setErrorMsg('')
                                field.onChange(e.target.value)
                              }}
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="!-mt-3" />
                    </FormItem>
                  )}
                />
                {errorMsg && (
                  <div className="text-red-500 text-sm font-medium mb-1">
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
