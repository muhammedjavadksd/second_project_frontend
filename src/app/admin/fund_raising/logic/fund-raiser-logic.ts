import { getUserDetails } from "@/app/_util/helper/authHelper";
import API_axiosInstance from "@/external/axios/api_axios_instance";
import axios_instance from "@/external/axios/axios-instance";
import { AxiosResponse as CustomeAxiosResponse } from "@/types/API Response/FundRaiser";
// import { AxiosResponse } from "axios/ty";
import { FormActionResponse } from "@/types/InterFace/UtilInterface";
import { AxiosError, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";




export async function getAllFundRaisers(limit: number = 10, page: number = 1): Promise<FormActionResponse> {


    try {

        let session = await getSession();
        let user = getUserDetails(session)

        let getFundRaisers: AxiosResponse = await axios_instance.get(`/api/admin_api/fund_raiser/view/${limit}/${page}`, {
            headers: {
                "authorization": `Bearer ${user.token}`
            }
        });
        let response: CustomeAxiosResponse = getFundRaisers.data;
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
    let user = getUserDetails(session)

    try {

        let request: AxiosResponse = await API_axiosInstance.post("/profile/admin/find_users_byids", {
            user_ids: JSON.stringify(user_ids)
        }, {
            headers: {
                "authorization": `Bearer ${user.token}`
            }
        })
        console.log(request);
        return { data: request.data, msg: "Users fetch success", status: true }
    } catch (e) {
        console.log(e);
        let errorMessage: string = e?.response?.data?.msg ?? "Something went wrong";
        return { msg: errorMessage, status: true }
    }

}