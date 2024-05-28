import { COOKIE_DATA_KEY } from "@/app/const/const";
import API_axiosInstance from "@/external/axios/api_axios_instance";
import { cookies } from "next/headers";


export async function POST(request) {
    try {

        let body = await request.json();

        let otpNumber = body.otp_number;

        let getCookies = cookies();
        let cookieToken = getCookies.get(COOKIE_DATA_KEY.SIGN_IN_DATA);
        let apiCall = API_axiosInstance.post("/auth/auth_otp_submission", {
            otp_number: otpNumber
        }, {
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${cookieToken.value}`
            }
        })
        let response = (await apiCall).data;
        if (response.status) {
            return new Response(JSON.stringify({
                status: true,
                msg: "OTP has been verified"
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