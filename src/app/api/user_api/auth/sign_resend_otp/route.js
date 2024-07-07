import { API_ENDPOINT, COOKIE_DATA_KEY, FRONT_END_APIENDPOINT } from "@/app/_util/_const/const";
import API_axiosInstance from "@/external/axios/api_axios_instance";
import { cookies } from "next/headers";

export async function POST(request) {
    try {


        let cookieData = cookies();
        let cookieValues = cookieData.get(COOKIE_DATA_KEY.SIGN_UP_DATA) ?? cookieData.get(COOKIE_DATA_KEY.SIGN_IN_DATA);


        console.log("The otp is : " + cookieValues);

        let resendOtpRequest = await API_axiosInstance.post(API_ENDPOINT.RESEND_USER_SIGNUP_EMAIL_ID, {}, {
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${cookieValues.value}`
            }
        })



        let response = resendOtpRequest.data;
        if (response.status) {
            let newToken = response.token;
            console.log("Email is has been updated");
            cookieData.set(COOKIE_DATA_KEY.SIGN_UP_DATA, newToken)
            return new Response(JSON.stringify({
                status: true,
                msg: "OTP has been resent"
            }, {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }))
        } else {
            return new Response(JSON.stringify({
                status: false,
                msg: response.msg
            }, {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            }))
        }

    } catch (e) {
        console.log(e);
        let errorMsg = e.response?.data?.msg ?? "Something went wrong";
        console.log(errorMsg);
        return new Response(JSON.stringify({
            status: false,
            msg: errorMsg
        }, {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        }))
    }

}