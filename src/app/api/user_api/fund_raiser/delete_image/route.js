import API_axiosInstance from "@/util/external/axios/api_axios_instance";


export async function DELETE(request) {


    console.log("Request came");

    const a = [1, 2, 4];


    try {
        console.log(request.query);
        const url = new URL(request.url);
        const searchParams = url.searchParams;

        const type = searchParams.get("type");
        const edit_id = searchParams.get("edit_id");
        const image_id = searchParams.get("image_id");

        let headers = request.headers;
        let authData = headers.get("authorization");



        console.log("Auth data");
        console.log(authData);
        let splitToken = authData.split(" ");
        console.log(request.query);

        if (splitToken[0] == "Bearer" && splitToken[1]) {

            let token = splitToken[1];

            let API_request = await API_axiosInstance.delete(`/fund_raise/delete_image/${type}/${edit_id}/${image_id}`, {
                headers: {
                    "authorization": `Bearer ${token}`,
                }
            })
            let response = API_request.data;
            if (response.status) {
                return new Response(JSON.stringify({
                    status: true,
                }), {
                    status: 200
                })
            } else {
                return new Response(JSON.stringify({
                    status: false,
                    msg: response.msg
                }), {
                    status: API_request.status
                })
            }
        } else {
            return new Response(JSON.stringify({
                status: false,
                msg: "Invalid authentication"
            }), {
                status: 401
            })
        }

    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({
            status: false,
            msg: "Internal Server Error"
        }), {
            status: 500
        })
    }
}