import { getAdminToken } from "@/app/_util/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
// import { useParams } from "next/navigation";


export async function GET(request, { param }) {


    console.log("session");
    let session = await getServerSession();
    console.log(session);

    try {
        let headers = request.headers;
        console.log(headers);
        let adminToken = getAdminToken(headers);
        if (adminToken) {
            console.log("The params");
            console.log(adminToken);
            let getAllFundRaisers = await API_axiosInstance.get("/fund_raise/admin/view/10/1", {
                headers: {
                    "authorization": `Bearer ${adminToken}`
                }
            });
            let response = getAllFundRaisers.data;
            if (response.status) {
                let allFundRaisers = response.data;
                if (allFundRaisers.length) {
                    return new Response(JSON.stringify({ status: true, data: allFundRaisers }, { status: 200 }))
                } else {
                    return new Response(JSON.stringify({ status: false, data: [], msg: "No data found" }, { status: 204 }))
                }
            } else {
                return new Response(JSON.stringify({ status: false, msg: response.msg ?? "Something went wrong" }, { status: getAllFundRaisers.status ?? 500 }))
            }
        } else {
            console.log("Invalid token");
            console.log(adminToken);
            return new Response(JSON.stringify({ status: false, msg: "Un authorized access" }, { status: 401 }))
        }
    } catch (e) {
        // console.log(e);
        let errorMessage = e?.response?.data?.msg ?? "Something went wrong";
        console.log(errorMessage);
        return new Response(JSON.stringify({ status: false, msg: errorMessage }, { status: e?.response?.status ?? 500 }))
    }
}