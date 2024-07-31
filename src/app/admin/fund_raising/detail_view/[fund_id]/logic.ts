import { userDetailsFromGetSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import { AxiosResponse, FundRaiserResponse } from "@/util/types/API Response/FundRaiser";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

// const { default: API_axiosInstance } = require("@/external/axios/api_axios_instance");


export async function getSingleFundRaisingProfile(fundraiser_id: string): Promise<AxiosResponse | null> {

    try {
        const session = await getSession();
        const adminDetail = userDetailsFromGetSession(session);
        let profile = await API_axiosInstance.get(`/fund_raise/admin/view/${fundraiser_id}`, {
            headers: {
                "authorization": `Bearer ${adminDetail.token}`
            }
        });
        return profile.data
    } catch (e) {
        console.log(e);
        return null
    }
}