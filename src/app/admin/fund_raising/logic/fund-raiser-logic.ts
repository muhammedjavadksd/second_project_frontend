import { userDetailsFromGetSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import axios_instance from "@/util/external/axios/axios-instance";
import { AxiosResponse as CustomeAxiosResponse } from "@/util/types/API Response/FundRaiser";
// import { AxiosResponse } from "axios/ty";
import { FormActionResponse } from "@/util/types/InterFace/UtilInterface";
import { AxiosError, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";




export async function getAllFundRaisers(limit: number, page: number): Promise<FormActionResponse> {


    try {

        let session = await getSession();
        let user = userDetailsFromGetSession(session, "admin")
        console.log(user);

        const token = user?.token

        let getAllFundRaisers = await API_axiosInstance.get(`/fund_raise/admin/view/${limit}/${page}`, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        });

        let response: CustomeAxiosResponse = getAllFundRaisers.data;
        console.log(response);

        if (response.status) {

            return { data: response.data, msg: "Data fetch success", status: true };
        } else {
            return { status: false, msg: response.msg }
        }
    } catch (e) {
        console.log(e);
        let errorMessage: string = e?.response?.data?.msg ?? "Something went wrong";
        // return errorMessage;
        return { msg: errorMessage, status: false }
    }
}


export async function getSingleUser(profile_id: string) {

    try {

        const profileApi: AxiosResponse = await API_axiosInstance.get(`profile/${profile_id}`);
        const responseProfile = profileApi.data;
        if (responseProfile.status) {
            const profile = responseProfile.profile;
            return profile;
        } else {
            return null
        }
    } catch (e) {
        console.log(e);
        return null
    }
}

export async function getUserForFundRaise(user_ids: string[]): Promise<FormActionResponse> {

    let session = await getSession();
    let user = userDetailsFromGetSession(session, "admin")

    try {

        let request: AxiosResponse = await API_axiosInstance.post("/profile/admin/find_users_byids", {
            user_ids: JSON.stringify(user_ids)
        }, {
            headers: {
                "authorization": `Bearer ${user.token}`
            }
        })
        const response = request.data;
        console.log(response);

        if (response.status) {
            let users = response.profile ?? [];
            return { data: users, msg: "Users fetch success", status: true }
        } else {
            return { msg: "No data found", status: false }
        }
    } catch (e) {
        console.log(e);
        let errorMessage: string = e?.response?.data?.msg ?? "Something went wrong";
        return { msg: errorMessage, status: true }
    }

}