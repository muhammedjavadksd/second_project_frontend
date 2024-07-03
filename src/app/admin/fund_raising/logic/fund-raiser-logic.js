import { getUserDetails } from "@/app/_util/helper/authHelper";
import API_axiosInstance from "@/external/axios/api_axios_instance";
import axios_instance from "@/external/axios/axios-instance";
import { getSession } from "next-auth/react";

export async function getAllFundRaisers() {

    try {

        let session = await getSession();
        let user = getUserDetails(session)

        let getFundRaisers = await axios_instance.get("/api/admin_api/fund_raiser/view/10/1", {
            headers: {
                "authorization": `Bearer ${user.token}`
            }
        });
        let response = getFundRaisers.data;
        console.log(response);
        if (response.status) {
            return response.data;
        } else {
            return response.msg
        }
    } catch (e) {
        console.log(e);
        let errorMessage = e?.response?.data?.msg ?? "Something went wrong";
        return errorMessage;
    }
}

export async function getUserForFundRaise() {

    console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

    try {

        console.log(API_axiosInstance);
        let request = await API_axiosInstance.post("/profile/admin/find_users_byids", {
            user_ids: JSON.stringify(['6669e9aec5a83a0681c931e3'])
        }, {
            headers: {
                "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11aGFtbWVkamF2YWQxMTkxNDRAZ21haWwuY29tIiwidHlwZSI6IkFETUlOX0FVVEgiLCJpYXQiOjE3MTkyMDQ4ODcsImV4cCI6MTcyMTAwNDg4N30.oOTFtSIjT1ABLataEfc0LzE8JlD51PoMOB0gIJaAVRc"
            }
        })
        console.log(request);
        return request.data
    } catch (e) {
        console.log(e);
        return null;
    }

}