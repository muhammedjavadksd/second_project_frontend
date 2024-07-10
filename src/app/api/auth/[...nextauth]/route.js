import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import NextAuth from "next-auth/next"
import CredentialsProvider from 'next-auth/providers/credentials'
import axios_instance from "@/external/axios/axios-instance"
import API_axiosInstance from "@/external/axios/api_axios_instance"



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
                email_address: {},
                password: {}
            },
            authorize: async (credentials, req) => {
                try {

                    console.log("Enterd");
                    console.log(credentials);

                    if (credentials.auth_type == "user") {


                        let otp_number = credentials.otp_number


                        let token = credentials.token;
                        console.log("Token is");
                        console.log(token);

                        let request = await axios_instance.post("/api/user_api/auth/login_otp", {
                            otp_number
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                                "authorization": `Bearer ${token}`
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
                    } else if (credentials.auth_type == "admin") {
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
                                token: response.token,
                                name: response.name,
                                email: email_address,
                                role: "admin"
                            });
                            return {
                                token: response.token,
                                name: response.name,
                                email: email_address,
                                role: "admin"
                            }
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
                            console.log("Login success");
                            console.log({
                                token: response.token,
                                name: response.name,
                                email: email_address,
                                role: "organization"
                            });
                            return {
                                token: response.token,
                                name: response.name,
                                email: email_address,
                                role: "organization"
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
        secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
        encryption: true,
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
}


export const handler = NextAuth(authOptions)
export { handler as POST, handler as GET }