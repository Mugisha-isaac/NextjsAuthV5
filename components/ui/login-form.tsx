"use client"

import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "./form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from 'zod';
import { LoginSchema } from "@/schemas";
import { Button } from "./button";
import { Input } from "./input";
import Link from "next/link";

export const LogInForm = () =>{
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });


    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Auth.js</CardTitle>
                <CardDescription>Welcome!</CardDescription>
            </CardHeader>

            <CardContent>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(()=> {})} className="space-y-7">
                   <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
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
                       render = {({field}) => (
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

                   <Button type="submit" size='lg' className="w-full">Sign in</Button>
                  </form>
                </Form>
            </CardContent>

            <CardFooter className="flex justify-between flex-col">
               <Link className="text-xs " href='/auth/register'>
                Don't have an account
               </Link>
            </CardFooter>
        </Card>
    )
}