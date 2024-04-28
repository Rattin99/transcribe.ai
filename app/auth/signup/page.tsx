
"use client"


import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'

import {zodResolver} from '@hookform/resolvers/zod';
import  {z} from 'zod';
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


const formSchema = z.object({
    userName: z.string().min(2,{message:"Username is required"}),
    email: z.string().email(),
    password: z.string().min(8,{
        message: "password should be at least 8 characters long"
    }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
})

export default function Signup() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

  return (
    <main className="w-screen h-screen  flex justify-center items-center">
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent>
                            <div>
                                <FormField
                                name='userName'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Username:</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                 />
                            </div>
                            <div>
                                <FormField
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                            <div>
                            <FormField
                            name="password"
                            render={({field}) => (
                            <FormItem>
                                <FormLabel>Passowrd</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                             )} />
                            </div>
                            <div>
                            <FormField
                            name="confirmPassword"
                            render={({field}) => (
                            <FormItem>
                                <FormLabel>Confirem Passowrd</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                             )} />
                            </div>
                        <p>Already have an account?<Link href={'/auth/login'}> <span className="underline">Log in</span></Link></p>

                    </CardContent>
                    <CardFooter>
                        <Button className ="w-full" type='submit' >Submit</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    </main>
  )
}
