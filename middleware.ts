import authConfig from './auth.config';
import NextAuth from 'next-auth';


const {auth} = NextAuth(authConfig);

const authRoutes = ["/auth/login", "/auth/register"];

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isAuthRoute = authRoutes.includes(req.url);
    const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");

    if(isApiAuthRoute) return;
    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL("dashboard", req.nextUrl));
        }
        return;
    }

    if(!isLoggedIn && !isAuthRoute){
        return Response.redirect(new URL("auth/login", req.nextUrl));
    }

    return;
});
