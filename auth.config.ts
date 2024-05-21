import type { NextAuthConfig } from "next-auth";
import credentials from 'next-auth/providers/credentials';
import { LoginSchema } from "./schemas";
import prisma from "./lib/db";
import bcrypt from "bcryptjs";


export default {
    providers: [
        credentials({
            async authorize(credentials){
               const validatedFields = LoginSchema.safeParse(credentials);
               if(validatedFields.success){
                const {email,password} = validatedFields.data;
                const user = await prisma.user.findUnique({where:{email}});
                if(!user || !user.password) return null;
                const passwordMatch = await bcrypt.compareSync(password,user.password);
                if(passwordMatch) return user;
               }
               return null;
            }
        })
    ]
} satisfies NextAuthConfig;