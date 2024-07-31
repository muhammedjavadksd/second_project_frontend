import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import { getSession } from "next-auth/react";
import const_data from "@/util/data/const";
import { userDetailsFromGetSession } from "@/util/data/helper/authHelper";
import { objectToUrlQuery } from "@/util/data/helper/utilHelper";
import axios_instance from "@/util/external/axios/axios-instance";
import { AxiosResponse } from "@/util/types/API Response/FundRaiser";
import { IAIDescriptionInitialValues } from "@/util/types/InterFace/FormInitialValues";


async function getAIDescription(amount: number, category: string, sub_category: string, raiser_name: string, raiser_age: number, benificiary_relation: string, description: string, city: string, pinCode: number, state: string, district: string) {

    const urlParamsObject = { amount, category, sub_category, raiser_name, raiser_age, benificiary_relation, description, city, pinCode, state, district };
    const query = objectToUrlQuery(urlParamsObject);

    try {
        if (const_data.AI_DESCRIPTION_GENERATION) {
            const data: AxiosResponse = await axios_instance.get(`/api/user_api/fund_raiser/ai_description?${query}`)

            const response = data?.data;
            if (response.status) {
                const AI_Description = response.data
                return AI_Description
            } else {
                return false
            }
        } else {

            return `Could you please consider making a donation to support my ${benificiary_relation}? Your contribution would greatly assist in the area of ${category}. Thank you for your generosity.`
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}


async function onDescriptionSubmit(val: IAIDescriptionInitialValues, successCB: Function, errorCB: Function) {

    const session = await getSession();
    const user = userDetailsFromGetSession(session)

    const { ai_description, currentApplication } = val

    if (user) {
        const token = user.token

        console.log("User found");

        try {

            const requestAPI: AxiosResponse = await API_axiosInstance.patch(`/fund_raise/edit/${currentApplication}`, {
                description: ai_description
            }, {
                headers: {
                    "authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            })

            console.log(currentApplication);

            const response = requestAPI.data;
            console.log(response);
            if (response.status) {
                successCB()
            } else {
                errorCB(response.msg)
            }

        } catch (e) {
            const errorMessage = e?.response?.body?.msg;
            console.log(e);
            console.log(errorMessage);
            errorCB(errorMessage)
        }
    } else {
        errorCB("Something went wrong")
    }
}


export default getAIDescription
export { onDescriptionSubmit }