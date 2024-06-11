import API_axiosInstance from "@/external/axios/api_axios_instance";


export async function POST(request) {

    try {

        let body = await request.json();
        let headers = request.headers;
        let fundRaiserID = headers.get("fund_id");
        let token = headers.get("authorization")
        let auth_token = token.split(" ");
        console.log("Token is " + auth_token);
        console.log("Fund raiser id is : " + fundRaiserID);

        if (auth_token[0] == "Bearer" && auth_token[1] && fundRaiserID) {
            let bearerToken = auth_token[1]

            console.log("Bearer has been crossed");

            let requestAPI = await API_axiosInstance.post(`/fund_raise/edit/${bearerToken}`, body, {
                headers: {
                    "authorization": `Bearer ${bearerToken}`,
                }
            })

            let response = requestAPI.data;
            if (response.status) {
                return new Response(JSON.stringify({
                    status: true,
                    msg: "Updated success"
                }, { status: 200 }))
            } else {
                return new Response(JSON.stringify({
                    status: false,
                    msg: response.msg
                }, { status: requestAPI.status }))
            }
        } else {
            return new Response(JSON.stringify({
                status: false,
                msg: "Invalid authentication"
            }, { status: 401 }))
        }

    } catch (e) {
        console.log(e);
        let errorMessage = e?.response?.body?.msg ?? "Something went wrong";
        return new Response(JSON.stringify({
            status: false,
            msg: errorMessage
        }, { status: e.response?.status ?? 500 }))
    }

}