import { COOKIE_DATA_KEY } from "@/app/_util/_const/const";
import API_axiosInstance from "@/external/axios/api_axios_instance";
import { signIn } from "next-auth/react";
import { cookies } from "next/headers";


export async function POST(request) {
    try {



        let body = await request.json();
        console.log("The body");
        console.log(body);

        let otpNumber = body.otp_number;

        let headers = request.headers;
        let token = request.headers.get('authorization');




        let getCookies = cookies();
        let cookieToken = getCookies.get(COOKIE_DATA_KEY.SIGN_IN_DATA);
        let auth_token = cookieToken ?? token;
        console.log(cookieToken + " " + token);
        console.log("Auth token is : " + auth_token);
        if (auth_token) {

            let apiCall = API_axiosInstance.post("/auth/auth_otp_submission", {
                otp_number: otpNumber
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": auth_token
                }
            })
            let response = (await apiCall).data;
            if (response.status) {
                // signIn("credentials",)
                console.log("Check response");
                console.log(response);
                return new Response(JSON.stringify({
                    status: true,
                    msg: "OTP has been verified",
                    token: response.token,
                    name: response.name,
                    email: response.email
                }, {
                    status: 200
                }))
            } else {
                return new Response(JSON.stringify({
                    status: false,
                    msg: response?.msg ?? "Something went wrong"
                }, {
                    status: 401
                }))
            }
        } else {
            return new Response(JSON.stringify({
                status: false,
                msg: "Auth is not valid"
            }, {
                status: 401
            }))
        }

    } catch (e) {
        console.log(e);
        let errorMessage = e?.response?.data?.msg ?? "Something went wrong";
        console.log(errorMessage);
        return new Response(JSON.stringify({
            status: false,
            msg: errorMessage
        }, {
            status: 401
        }))
    }
}