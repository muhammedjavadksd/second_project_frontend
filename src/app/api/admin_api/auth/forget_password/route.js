import API_axiosInstance from "@/external/axios/api_axios_instance";

export async function POST(request) {

    try {


        let body = await request.json();
        let email_address = body.email_address;

        let reset_password = await API_axiosInstance.post("/auth/admin/forget_password", {
            email_id: email_address
        });

        let response = reset_password.data;
        if (response.status) {
            return new Response(JSON.stringify({
                status: true,
                msg: "Reset email has been sent"
            }), {
                status: 200
            })
        } else {
            return new Response(JSON.stringify({
                status: false,
                msg: response.msg ?? "Something went wrong"
            }), {
                status: 2401
            })
        }
    } catch (e) {
        console.log(e);
        let errorMsg = e?.response?.data?.msg ?? "Something went wrong";
        return new Response(JSON.stringify({
            status: false,
            msg: errorMsg
        }), {
            status: 500
        })
    }
}