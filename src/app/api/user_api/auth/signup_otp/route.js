import { COOKIE_DATA_KEY } from "@/util/data/const";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import { cookies } from "next/headers";

export async function POST(request) {
    console.log("OTP Invoked");
    try {
        const headers = request.headers;
        console.log(headers);
        let body = await request.json();

        console.log(body);

        let { otp_number, email_id } = body;
        console.log(otp_number, email_id);
        console.log("The body" + otp_number + " " + email_id);

        let cookieData = cookies();
        let cookieValues = cookieData.get(COOKIE_DATA_KEY.SIGN_UP_DATA);

        console.log("OTp submission cookie value is : " + cookieValues.value);
        console.log(cookieValues.value);

        let otpSubmissionRequest = await API_axiosInstance.post("/auth/auth_otp_submission", {
            otp_number,
            email_id
        }, {
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${cookieValues.value}`
            }
        })


        let response = otpSubmissionRequest.data;
        if (response.status) {
            return new Response(JSON.stringify({ status: true, msg: "OTP Verified success" }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            return new Response(JSON.stringify({ status: false, msg: response.msg }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ status: false, msg: "Something went wrong" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}