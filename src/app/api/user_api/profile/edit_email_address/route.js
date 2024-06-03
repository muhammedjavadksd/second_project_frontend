import API_axiosInstance from "@/external/axios/api_axios_instance";


export async function PATCH(request) {


    console.log("Email address update request");

    try {

        let body = await request.json();
        let { email } = body;

        let headers = request.headers;
        let authToken = headers.get('authorization');
        let extractToken = authToken.split(" ");
        console.log(email);
        if (extractToken[0] == "Bearer") {
            let token = extractToken[1];
            if (email && token) {

                let emailUpdate = await API_axiosInstance.patch("/profile/update_email_id", {
                    new_email_id: email
                }, {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                })

                let response = emailUpdate.data;

                return new Response(JSON.stringify({
                    status: response.status,
                    msg: response.msg
                }), {
                    status: emailUpdate.status
                })
            } else {
                return new Response(JSON.stringify({
                    status: false,
                    msg: "Please provide valid email id"
                }), {
                    status: 400
                })
            }
        } else {
            return new Response(JSON.stringify({
                status: false,
                msg: "Authentication failed"
            }), {
                status: 401
            })
        }
    } catch (e) {
        console.log(e);
        let errorMessage = e?.response?.data?.msg ?? "Something went wrong";
        console.log(errorMessage);
        return new Response(JSON.stringify({
            status: false,
            msg: errorMessage
        }), {
            status: e?.response?.status ?? 500
        })
    }
}   