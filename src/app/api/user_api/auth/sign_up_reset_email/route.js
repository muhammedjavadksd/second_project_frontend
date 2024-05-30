import { API_ENDPOINT, COOKIE_DATA_KEY } from "@/app/const/const";
import API_axiosInstance from "@/external/axios/api_axios_instance";
import { cookies } from "next/headers";


export async function POST(request) {
    try {

        let body = await request.json();
        let { email_id } = body;


        let cookieData = cookies();
        let cookieValues = cookieData.get(COOKIE_DATA_KEY.SIGN_UP_DATA);

        console.log(API_ENDPOINT.RESET_USER_SIGNUP_EMAIL_ID);



        let requestToResetEmailID = API_axiosInstance.put(API_ENDPOINT.RESET_USER_SIGNUP_EMAIL_ID, {
            email_id
        }, {
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${cookieValues.value}`
            }
        });

        let response = (await requestToResetEmailID).data;
        console.log(response);
        if (response.status && response.token) {
            console.log("Email is has been updated");
            cookieData.set(COOKIE_DATA_KEY.SIGN_UP_DATA, response.token)
            return new Response(JSON.stringify({
                status: true,
                msg: "Email has been reseted"
            }, {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }))
        } else {
            console.log("Email is has been failed");
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
        console.log("Got an error");
        console.log(e);
        return new Response(JSON.stringify({
            status: true,
            msg: "Something went wrong"
        }, {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        }))
    }
}