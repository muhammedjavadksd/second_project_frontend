import API_axiosInstance from "@/external/axios/api_axios_instance";


export async function POST(request) {
    try {
        let body = await request.json();

        let { email_address, password } = body;


        let adminAuth = await API_axiosInstance.post("/auth/admin/sign_in", {
            email_address,
            password
        })

        let response = adminAuth.data;
        console.log("API response is : ");
        console.log(response);
        if (response.status && response.token) {
            console.log("Token is");
            console.log(response.token);
            return new Response(JSON.stringify({
                status: true,
                msg: "Admin login success",
                token: response.token,
                name: response.name
            }, {
                status: 200
            }))
        } else {
            return new Response(JSON.stringify({
                status: false,
                msg: response.msg ?? "Something went wrong",
            }, {
                status: 401
            }))
        }

    } catch (e) {
        let errorMessage = e?.response?.data?.msg ?? "Something went wrong";
        console.log(errorMessage);
        return new Response(JSON.stringify({
            status: false,
            msg: errorMessage,
        }, {
            status: 500
        }))
    }
}