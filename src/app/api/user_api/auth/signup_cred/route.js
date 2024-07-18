import { AUTH_PROVIDERS, COOKIE_DATA_KEY } from "@/util/data/const";
import API_axiosInstance from "@/util/external/axios/api_axios_instance"
import { cookies } from "next/headers";

export async function POST(request) {


    console.log("Invoked");
    try {
        let body = await request.json()
        console.log(body);

        let {
            first_name,
            last_name,
            phone_number,
            email_address,
            blood_group,
            location
        } = body

        let auth_id = "";
        let auth_provider = AUTH_PROVIDERS.CREDENTIAL

        let dataSignUp = { phone_number, email_address, auth_id, auth_provider, first_name, last_name, location, blood_group }

        let signUpRequets = await API_axiosInstance.post("/auth/sign_up", dataSignUp)
        let signUpResponse = signUpRequets.data;
        if (signUpResponse.status) {
            let cookiesSet = cookies();
            cookiesSet.set(COOKIE_DATA_KEY.SIGN_UP_DATA, signUpResponse.token)
            return new Response(JSON.stringify({ status: true, msg: "Account initiated success" }),
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
        } else {
            return new Response(JSON.stringify({ status: false, msg: signUpResponse.msg }), {
                status: 409,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    } catch (e) {
        console.log(e);
        console.log("The next error is:");
        let errorMsg = e.response?.data.msg ?? "Something went wrong"
        console.log(errorMsg);
        return new Response(JSON.stringify({ status: false, msg: errorMsg }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}