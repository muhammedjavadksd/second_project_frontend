import API_axiosInstance from "@/external/axios/api_axios_instance";


export async function POST(request) {

    try {

        let body = await request.json();
        let { password, confirm_password, } = body;
        let headers = request.headers;
        let token = headers.get("token")

        console.log(headers);
        console.log("The token is :" + token);



        let apiRequest = await API_axiosInstance.post(`/auth/admin/reset_password`, {
            password: password
        }, {
            headers: {
                token: token
            }
        })
        let response = apiRequest.data;
        if (response.status) {
            return new Response(JSON.stringify({
                status: true,
                msg: "Password reset success"
            }, {
                status: 200
            }))
        } else {
            return new Response(JSON.stringify({
                status: true,
                msg: "Password reset failed"
            }, {
                status: 401
            }))
        }
    } catch (e) {
        let errorMessage = e?.response?.data?.msg ?? "Something went wrong";
        return new Response(JSON.stringify({
            status: false,
            msg: errorMessage
        }, {
            status: 500
        }))
    }
}