import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import NextAuth from "next-auth/next"
import CredentialsProvider from 'next-auth/providers/credentials'
import axios_instance from "@/external/axios/axios-instance"
import API_axiosInstance from "@/external/axios/api_axios_instance"
import { IAdminSessionData, IOrganizationSessionData, IUserSessionData } from "@/types/InterFace/UtilInterface"



let authOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLINET_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
        }),
        FacebookProvider({
            clientId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
            clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET_ID
        }),
        CredentialsProvider({
            credentials: {
                otp_number: {},
                auth_type: { type: "hidden" },
                token: { type: "hidden" },
                email_address: {},
                password: {}
            },
            authorize: async (credentials, req) => {
                try {

                    if (credentials.auth_type == "user") {

                        let otp_number = credentials.otp_number
                        let token = credentials.token;


                        let apiCall = await API_axiosInstance.post("/auth/auth_otp_submission", {
                            otp_number: otp_number
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                                "authorization": `Bearer ${token}`
                            }
                        })

                        let response = apiCall.data;
                        console.log(response);


                        if (response.status) {
                            const user_data = response.data;
                            let storingData: IUserSessionData = {
                                id: user_data.user_id,
                                token: user_data.jwt,
                                first_name: user_data.first_name,
                                last_name: user_data.last_name,
                                phone: user_data.phone,
                                email: user_data.email,
                                role: "user"
                            };
                            console.log(storingData);

                            return storingData
                        } else {
                            return null
                        }
                    } else if (credentials.auth_type == "admin") {
                        let email_address = credentials.email_address;
                        let password = credentials.password;

                        console.log("Worked this");


                        let adminAuth = await API_axiosInstance.post("/auth/admin/sign_in", {
                            email_address,
                            password
                        })

                        let response = adminAuth.data;
                        console.log(response);

                        if (response.status) {
                            const data = response.data;
                            const sessionData: IAdminSessionData = {
                                id: data.id,
                                token: data.token,
                                name: data.name,
                                email: email_address,
                                role: "admin",
                            }

                            return sessionData as IAdminSessionData
                        } else {
                            return null
                        }

                    } else if (credentials.auth_type == "organization") {
                        //if it organization
                        const email_address = credentials.email_address;
                        const password = credentials.password;

                        let request = await API_axiosInstance.post("/auth/organization/sign_in", {
                            email_address,
                            password
                        })

                        let response = request.data;
                        if (response.status) {
                            const sessionData: IOrganizationSessionData = {
                                email: response.email,
                                id: response.id,
                                name: response.name,
                                role: "organization",
                                token: response.token
                            }
                            return sessionData as IOrganizationSessionData
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
            if (user) {
                token.user = user
            }
            return token;
        },
        async session(session) {
            return session
        },
    },
    jwt: {
        secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
        encryption: true,
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
}


export const handler = NextAuth(authOptions)
export { handler as POST, handler as GET }