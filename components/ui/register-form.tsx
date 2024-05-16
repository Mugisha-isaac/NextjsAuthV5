"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { RegisterSchema } from "@/schemas";
import { Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage } from "./form";
import { Button } from "./button";
import { Input } from "./input";
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "./card";
import Link from "next/link";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";


export const RegisterForm = () =>{
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues:{
            name: '',
            password: '',
            email: ''
        }
    });

    const [isPending, startTransition] = useTransition();
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    const onSubmit = (values: z.infer<typeof RegisterSchema>) =>{
        startTransition(async()=>{
           const data = await register(values);
           if(data && data.success) setSuccess(data.success);
           if(data && data.error) setError(data.error);
        })
    }

    return(
        <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Auth.js</CardTitle>
          <CardDescription>Welcome!</CardDescription>
        </CardHeader>
  
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
              <div className="space-y-4">


              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="******" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {success && (
                <div className="bg-green-500 text-white px-4 py-2 rounded-md">
                  {success}
                </div>
              )}

              {error && (
                <div className="bg-red-500 text-white px-4 py-2 rounded-md">
                  {error}
                </div>
              )}
              <Button type="submit" size="lg" className="w-full" disabled={isPending}>
              Sign up
              </Button>
            </form>
          </Form>
        </CardContent>
  
        <CardFooter className="flex justify-between flex-col">
          <Link className="text-xs " href="/auth/register">
          Already registered?
          </Link>
        </CardFooter>
      </Card>
    )
}