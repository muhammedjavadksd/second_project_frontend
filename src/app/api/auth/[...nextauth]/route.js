import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import NextAuth from "next-auth/next"
import CredentialsProvider from 'next-auth/providers/credentials'
import axios_instance from "@/external/axios/axios-instance"
import { cookies } from "next/headers"
import { COOKIE_DATA_KEY } from "@/app/const/const"



let authOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLINET_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_SECRET_ID
        }),
        CredentialsProvider({
            credentials: {
                otp_number: {}
            },
            authorize: async (credentials, req) => {
                try {
                    let otp_number = credentials.otp_number

                    let getCookies = cookies();
                    let token = getCookies.get(COOKIE_DATA_KEY.SIGN_IN_DATA)

                    let request = await axios_instance.post("/api/auth/login_otp", {
                        otp_number
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                            "authorization": `Bearer ${token.value}`
                        }
                    })

                    let response = request.data;
                    console.log(response);
                    if (response.status) {
                        console.log("Login success");
                        return {
                            token: response.token,
                            name: response.name,
                            email: response.email
                        }
                    } else {
                        return null
                    }
                } catch (E) {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            console.log("JWT callback - token:", token);
            console.log("JWT callback - account:", account);
            console.log("JWT callback - user:", user);

            if (account) {
                token.accessToken = account.access_token;
            }
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken
            console.log("The session is:");
            console.log(session);

            console.log("The  token is:");
            console.log(token);


            return session
        },
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        encryption: true,
    },
    secret: process.env.NEXTAUTH_SECRET,
}


export const handler = NextAuth(authOptions)
export { handler as POST, handler as GET }