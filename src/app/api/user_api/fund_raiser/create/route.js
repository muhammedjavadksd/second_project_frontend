import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";


export async function POST(request) {
    try {

        let header = request.headers;
        let authData = header.get("authorization");
        console.log(header);
        console.log("Here");
        console.log("The token is  : " + authData);
        let splitToken = authData.split(" ");
        console.log("Token");
        console.log(splitToken);
        if (splitToken[0] == "Bearer" && splitToken[1]) {
            let token = splitToken[1];

            console.log("It has a token");


            let body = await request.json();
            let { amount, category, sub_category, phone_number, email_id } = body

            console.log("User data is");


            let createEndPoint = await API_axiosInstance.post("/fund_raise/create", {
                amount, category, sub_category, phone_number, email: email_id
            }, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            let data = createEndPoint.data;
            let statusCode = createEndPoint.status
            if (data.status) {
                return new Response(JSON.stringify({ status: true, msg: "Fund raise created success", fund_id: data.fund_id }), { status: statusCode })
            } else {
                let errorMsg = data.msg ?? "Something went wrong"
                return new Response(JSON.stringify({ status: false, msg: errorMsg }), { status: statusCode })
            }

        } else {
            let errMsg = "Un Authraized";
            return new Response(JSON.stringify({ status: false, msg: errMsg }), { status: 401 })
        }

    } catch (e) {
        console.log(e);
        let errMsg = e?.response?.data?.msg ?? "Something went wrong";
        return new Response(JSON.stringify({ status: false, msg: errMsg }), { status: e.response?.status ?? 500 })
    }
}   