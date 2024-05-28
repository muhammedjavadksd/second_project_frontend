import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import NextAuth from "next-auth/next"



let authOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLINET_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_SECRET_ID
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken
            return session
        }
    }
}


export async function POST(request) {
    return NextAuth(authOptions)(request);
}