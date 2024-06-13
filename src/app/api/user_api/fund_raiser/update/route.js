import API_axiosInstance from "@/external/axios/api_axios_instance";


export async function PATCH(request) {


    console.log("Fund raise updte");

    try {

        let body;

        let contentType = request.headers.get('Content-Type');
        if (contentType && contentType.includes('multipart/form-data')) {
            // Read as FormData
            body = await request.formData();
        } else {
            // Read as JSON
            body = await request.json();
        }

        let headers = request.headers;
        let fundRaiserID = headers.get("fund_id");
        let token = headers.get("authorization")
        let auth_token = token.split(" ");
        console.log("Token is " + auth_token);
        console.log("Fund raiser id is : " + fundRaiserID);
        // return;
        if (auth_token[0] == "Bearer" && auth_token[1] && fundRaiserID) {
            let bearerToken = auth_token[1]

            console.log("Bearer has been crossed");
            console.log(bearerToken);

            let requestAPI = await API_axiosInstance.patch(`/fund_raise/edit/${fundRaiserID}`, body, {
                headers: {
                    "authorization": `Bearer ${bearerToken}`,
                    // 'Content-Type': 'multipart/form-data'
                },
            })

            console.log("Worked this");

            let response = requestAPI.data;
            if (response.status) {
                return new Response(JSON.stringify({
                    status: true,
                    msg: "Updated success",
                    documents: response.documents,
                    pictures: response.pictures
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
        console.log("Try catch error");
        console.log(e);
        let errorMessage = e?.response?.body?.msg ?? "Something went wrong";
        console.log(e.response);
        return new Response(JSON.stringify({
            status: false,
            msg: errorMessage
        }, { status: e.response?.status ?? 500 }))
    }

}