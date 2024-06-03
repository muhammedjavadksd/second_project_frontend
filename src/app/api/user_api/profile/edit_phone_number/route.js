import API_axiosInstance from "@/external/axios/api_axios_instance";


export async function PATCH(request) {
    console.log("Auth token is :");
    try {


        let body = await request.json();
        console.log(body);
        let { phone_number } = body;

        let headers = request.headers;
        let authToken = headers.get('authorization');
        let extractToken = authToken.split(" ");
        console.log(phone_number);
        if (extractToken[0] == "Bearer") {
            let token = extractToken[1];
            if (phone_number && token) {

                let changePhoneNumber = await API_axiosInstance.patch("/profile/update_phone_number", {
                    new_phone_number: phone_number
                }, {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                })
                console.log("Retruned" + changePhoneNumber.status);

                let response = changePhoneNumber.data;

                console.log(response);


                return new Response(JSON.stringify({
                    status: response.status,
                    msg: response.msg
                }), {
                    status: changePhoneNumber.status
                })

            } else {
                return new Response(JSON.stringify({
                    status: false,
                    msg: "Please provide valid creditials"
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
    } catch (E) {
        console.log(E);
        // error.response.data.message
        let errorMsg = E?.response?.data?.msg ?? "Something went wrong";
        return new Response(JSON.stringify({
            status: false,
            msg: errorMsg
        }), {
            status: E?.response?.status ?? 500
        })
    }
}