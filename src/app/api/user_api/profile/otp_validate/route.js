import API_axiosInstance from "@/util/external/axios/api_axios_instance";


export async function PATCH(request) {

    console.log("Recivied request");

    try {

        let body = await request.json();
        let { otp_number, otp_type } = body;

        console.log("DATA");

        let headers = request.headers;
        let authToken = headers.get('authorization');
        let extractToken = authToken.split(" ");


        if (extractToken[0] == "Bearer") {
            let token = extractToken[1];
            if (token) {

                let otpValidate = await API_axiosInstance.patch("/profile/profile_update_otp_submission", {
                    otp_number: otp_number,
                    otp_type,
                }, {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                })
                // console.log("Retruned" + changePhoneNumber.status);

                let response = otpValidate.data;

                console.log(response);


                return new Response(JSON.stringify({
                    status: response.status,
                    msg: response.msg
                }), {
                    status: otpValidate.status
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
    } catch (e) {
        console.log(e);
        let errorMessage = e?.response?.data?.msg ?? "Something went wrong"
        return new Response(JSON.stringify({
            status: false,
            msg: errorMessage
        }), {
            status: 500
        })
    }
}