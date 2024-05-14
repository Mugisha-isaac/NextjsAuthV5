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

    
    return <span>Login Page</span>
}