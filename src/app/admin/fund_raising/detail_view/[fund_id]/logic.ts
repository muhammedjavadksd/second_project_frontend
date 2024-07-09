import { AxiosResponse, FundRaiserResponse } from "@/types/API Response/FundRaiser";

const { default: API_axiosInstance } = require("@/external/axios/api_axios_instance");


export async function getSingleFundRaisingProfile(fundraiser_id: string): Promise<AxiosResponse | null> {

    try {
        let profile = await API_axiosInstance.get(`/fund_raise/admin/view/${fundraiser_id}`);
        return profile.data
    } catch (e) {
        console.log(e);
        return null
    }
}