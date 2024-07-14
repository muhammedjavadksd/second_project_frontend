import { userDetailsFromGetSession } from "@/app/_util/helper/authHelper";
import API_axiosInstance from "@/external/axios/api_axios_instance";
import axios_instance from "@/external/axios/axios-instance";
import { AxiosResponse as CustomeAxiosResponse } from "@/types/API Response/FundRaiser";
// import { AxiosResponse } from "axios/ty";
import { FormActionResponse } from "@/types/InterFace/UtilInterface";
import { AxiosError, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";




export async function getAllFundRaisers(limit: number, page: number): Promise<FormActionResponse> {


    try {

        let session = await getSession();
        let user = userDetailsFromGetSession(session)
        console.log(user);

        const token = user?.token

        let getAllFundRaisers = await API_axiosInstance.get(`/fund_raise/admin/view/${limit}/1`, {
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

export async function getUserForFundRaise(user_ids: string[]): Promise<FormActionResponse> {

    let session = await getSession();
    let user = userDetailsFromGetSession(session)

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