import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import NextAuth, { getServerSession } from "next-auth/next"
import CredentialsProvider from 'next-auth/providers/credentials'
import axios_instance from "@/util/external/axios/axios-instance"
import API_axiosInstance from "@/util/external/axios/api_axios_instance"
import { IAdminSessionData, IOrganizationSessionData, IUserSessionData } from "@/util/types/InterFace/UtilInterface"
import { userDetailsFromGetSession } from "@/util/data/helper/authHelper"



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


                        console.log(token);

                        let apiCall = await API_axiosInstance.post("/auth/auth_otp_submission", {
                            otp_number: otp_number
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                                "authorization": `Bearer ${token}`
                            }
                        })
                        console.log("Eneterd123");

                        let response = apiCall.data;
                        console.log("This ");

                        console.log(response);


                        if (response.status) {
                            console.log("track1");

                            let profileApi = await API_axiosInstance.get("/profile/get_profile", {
                                headers: {
                                    'Content-Type': 'application/json',
                                    "authorization": `Bearer ${response?.data?.jwt}`
                                }
                            })
                            console.log("track1");
                            const data = profileApi.data;
                            console.log(profileApi);

                            if (data.status) {
                                const { profile } = data.data;
                                const user_data = response.data;
                                let storingData: IUserSessionData = {
                                    id: user_data.user_id,
                                    token: user_data.jwt,
                                    first_name: user_data.first_name,
                                    last_name: user_data.last_name,
                                    phone: user_data.phone,
                                    email: user_data.email,
                                    role: "user",
                                    blood_donor_id: profile.blood_donor_id
                                }
                                console.log(storingData);

                                return storingData
                            } else {
                                return null
                            }

                        } else {
                            return null
                        }
                    } else if (credentials.auth_type == "user_login_with_token") {
                        const session = await getServerSession()
                        const user = userDetailsFromGetSession(session);
                        const auth_token = user.token;

                        let adminAuth = await API_axiosInstance.post("/auth/auth_otp_submission", {}, {
                            headers: {
                                authorization: `Bearer ${auth_token}`
                            }
                        })
                        const response = adminAuth.data;
                        if (response?.status) {
                            const profile = response.profile;
                            let storingData: IUserSessionData = {
                                id: profile.user_id,
                                token: profile.jwt,
                                first_name: profile.first_name,
                                last_name: profile.last_name,
                                phone: profile.phone,
                                email: profile.email,
                                role: "user",
                                blood_donor_id: profile.blood_donor_id
                            }
                        } else {
                            return null
                        }
                    }
                    else if (credentials.auth_type == "admin") {
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
                    console.log(E);

                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            console.log("Worked");

            console.log(token, user, account);

            if (user) {
                token.user = user
            }
            return token;
        },
        async session(session) {
            console.log("thus");

            console.log(session);

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