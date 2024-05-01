
"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {zodResolver} from '@hookform/resolvers/zod';
import  {z} from 'zod';
import {Control, FieldValues, set, useForm} from 'react-hook-form';


import React, { useContext, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserContext } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8,{
        message: "password should be at least 8 characters long"
    })
})

export default function Login() {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const userContext  = useContext(UserContext);
    //@ts-ignore
    const {user, setUser} = userContext;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
       try{
        const response = await fetch('http://localhost:5000/api/v1/user/login-user',{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        })

        if(!response.ok) console.log("error:",response)

        const {email,id,token} = await response.json()

        localStorage.setItem('token',token);
        localStorage.setItem('id',id);
        localStorage.setItem('email',email);

        setUser({email: email, userId: id})
       } catch (err) {
        console.log(err)
       }
    }

    useEffect(()=> {
       const token = localStorage.getItem('token');

       if(token) {
        if(!user) {
            const userId = localStorage.getItem('id');
            const userEmail = localStorage.getItem('email');

            setUser({email: userEmail, userId:userId});
        }

        router.push('/')
       }
    },[router,user])

  return (
   <main className="w-screen h-screen  flex justify-center items-center">
    <Card className="w-[350px] ">
        <CardHeader>
            <CardTitle>Log in</CardTitle>
        </CardHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent>
                   <div className="py-2">
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
                    <div className="py-2">
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
                    <p>Don't have an account?<Link href={'/auth/signup'}> <span className="underline">sign up</span></Link></p>
                </CardContent>
                <CardFooter className="">
                    <Button className="w-full" type="submit">Submit</Button>
                </CardFooter>
            </form>
        </Form>
    </Card>
   </main>
  )
}
