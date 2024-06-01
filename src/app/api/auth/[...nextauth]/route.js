import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import NextAuth from "next-auth/next"
import CredentialsProvider from 'next-auth/providers/credentials'
import axios_instance from "@/external/axios/axios-instance"
import { cookies } from "next/headers"
import { COOKIE_DATA_KEY } from "@/app/_util/_const/const"



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
                otp_number: {},
                auth_type: { type: "hidden" },
                email_address: {},
                password: {}
            },
            authorize: async (credentials, req) => {
                try {

                    console.log("Enterd");
                    console.log(credentials);

                    if (credentials.auth_type == "user") {


                        let otp_number = credentials.otp_number

                        let getCookies = cookies();
                        let token = getCookies.get(COOKIE_DATA_KEY.SIGN_IN_DATA)

                        let request = await axios_instance.post("/api/user_api/auth/login_otp", {
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
                            console.log("Storing data")
                            let storingData = {
                                token: response.token,
                                first_name: response.first_name,
                                last_name: response.last_name,
                                phone: response.phone,
                                email: response.email,
                                role: "user"
                            };
                            console.log(storingData);
                            return storingData
                        } else {
                            return null
                        }
                    } else {
                        let email_address = credentials.email_address;
                        let password = credentials.password;

                        let request = await axios_instance.post("/api/admin_api/auth/login", {
                            email_address,
                            password
                        })

                        let response = request.data;
                        console.log("The response");
                        console.log(response);
                        if (response.status) {
                            console.log("Login success");
                            console.log({
                                token: response.jwt,
                                name: response.name,
                                email: email_address,
                                role: "admin"
                            });
                            return {
                                token: response.jwt,
                                name: response.name,
                                email: email_address,
                                role: "admin"
                            }
                        } else {
                            return null
                        }

                    }
                } catch (E) {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {


            console.log(token);
            console.log(user);
            console.log(account);

            if (user) {
                console.log("User has ");
                let insertObject = {
                    id: user.id,
                    token: user.token,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                };
                console.log("Insert object is");
                console.log(insertObject);
                token.user = insertObject
            }




            return token;
        },
        async session(session) {
            // session.accessToken = token.accessToken
            // console.log("The session is:");
            // console.log(session);

            // console.log("The  token is:");
            // token.user = user;
            // console.log(token);

            // console.log("The user is :");
            // console.log(user);


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