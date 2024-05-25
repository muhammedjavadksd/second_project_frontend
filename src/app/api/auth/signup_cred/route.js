import { AUTH_PROVIDERS } from "@/app/const/const";
import API_axiosInstance from "@/external/axios/api_axios_instance"

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
        return new Response(JSON.stringify({ status: false, msg: "Something went wrong" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}