import { getUserDetails } from "@/app/_util/helper/authHelper";
import API_axiosInstance from "@/external/axios/api_axios_instance";
import axios_instance from "@/external/axios/axios-instance";
import { getSession } from "next-auth/react";

export async function getAllFundRaisers(limit = 10, page = 1) {

    try {

        let session = await getSession();
        let user = getUserDetails(session)

        let getFundRaisers = await axios_instance.get(`/api/admin_api/fund_raiser/view/${limit}/${page}`, {
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

export async function getUserForFundRaise(user_ids) {

    console.log(user_ids);
    let session = await getSession();
    let user = getUserDetails(session)

    try {

        console.log(API_axiosInstance);
        let request = await API_axiosInstance.post("/profile/admin/find_users_byids", {
            user_ids: JSON.stringify(user_ids)
        }, {
            headers: {
                "authorization": `Bearer ${user.token}`
            }
        })
        console.log(request);
        return request.data
    } catch (e) {
        console.log(e);
        return null;
    }

}