'use client'

import { CardWrapper } from '@/components/auth/card-wrapper'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RegisterSchema } from '@/schemas'
import userApi from '@/services/api/modules/user-api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

interface RegisterFormProps {}

export const RegisterForm = ({}: RegisterFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const router = useRouter()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('')
    setSuccess('')
    startTransition(async () => {
      await userApi
        .register(values)
        .then(({ response, error }) => {
          if (response && response.user) {
            form.reset()
            toast.success('Бүртгэл амжилттай')
            router.push('/auth/login')
            return
          }

          if (error) {
            setError(error)
          }
        })
        .catch(error => console.log(error))
    })
  }

  return (
    <CardWrapper
      headerLabel=""
      headerDescription="И-мэйлээ баталгаажуулан данс үүсгэ."
      backButtonLabel="Та аль хэдийн бүртгэлтэй юу?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-[28px]">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="input-group">
                      <div className="wrap-input">
                        <Input disabled={isPending} {...field} />
                        <label>Хэрэглэгчийн нэр</label>
                        <span className="validation">Алдаа гарлаа</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="input-group">
                      <div className="wrap-input">
                        <Input disabled={isPending} {...field} />
                        <label>Нэр</label>
                        <span className="validation">Алдаа гарлаа</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="input-group">
                      <div className="wrap-input">
                        <Input type="email" disabled={isPending} {...field} />
                        <label>И-мэйл</label>
                        <span className="validation">Алдаа гарлаа</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="input-group">
                      <div className="wrap-input">
                        <Input
                          disabled={isPending}
                          className="form-control"
                          type="password"
                          {...field}
                        />
                        <label>Нууц үг</label>
                        <span className="validation">Алдаа гарлаа</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="input-group text-center">
            <button
              type="submit"
              className="btn btn-submit disabled:pointer-events-none disabled:opacity-50"
              disabled={isPending}
            >
              <span className="color-main">Данс үүсгэх</span>
            </button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}
