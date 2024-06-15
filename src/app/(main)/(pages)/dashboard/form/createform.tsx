"use client"
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../../../components/ui/form'
import { Toaster, toast } from 'sonner'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { Card, CardContent } from '../../../../../components/ui/card'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useCounterStore } from '@/lib/state'


const formSchema = z.object({
  title: z.string(),
  description: z.string(),
})

export default function CreateForm() {

  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: ""
    },
  })
  const user = useUser()
  const{count,increment}= useCounterStore()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast.error("User not found")
      return
    }
    
    setLoading(true)
    try {
      const response = await fetch('/api/createjob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          userId: user.user?.id
        })
      })

      const body = await response.json()
      
      if (response.ok) {
        toast.success(body.message)
        increment()
      } else {
        toast.error(body.error)
      }
    } catch (error) {
      console.log(error)
      toast.error("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className='mx-auto'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Title" {...field}  disabled={loading} required/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field}  disabled={loading}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{
              loading ? "Creating..." : "Submit"
            }</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
