import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";

export async function PATCH(requets) {

    try {


        let headers = requets.headers;
        let authToken = headers.get('authorization');
        let extractToken = authToken.split(" ");
        if (extractToken[0] == "Bearer") {
            let token = extractToken[1];

            let body = await requets.json();
            let { first_name, last_name } = body;


            let editProfileEndPoint = await API_axiosInstance.patch("/profile/update_profile", {
                user_profile: {
                    first_name,
                    last_name
                }
            }, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            let response = editProfileEndPoint.data;
            if (response.status) {
                return new Response(JSON.stringify({ status: true, msg: "Profile updated success" }, {
                    status: 200
                }))
            } else {
                let msg = response?.msg ?? "Something went wrong";
                return new Response(JSON.stringify({ status: false, msg: msg }, { status: 400 }))
            }

            // return new Response(JSON.stringify({ status: true }))
        }

    } catch (e) {
        console.log(e);
        let msg = e?.response?.data?.msg ?? "Something went wrong";
        return new Response(JSON.stringify({ status: false, msg: msg }, { status: 500 }))
    }
}