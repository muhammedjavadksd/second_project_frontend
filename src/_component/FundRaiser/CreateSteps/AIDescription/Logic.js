import { userDetailsFromGetSession } from "@/app/_util/helper/authHelper";
import { objectToUrlQuery } from "@/app/_util/helper/utilHelper";
import API_axiosInstance from "@/external/axios/api_axios_instance";
import { getSession } from "next-auth/react";

const { default: axios_instance } = require("@/external/axios/axios-instance");

async function getAIDescription(amount, category, sub_category, raiser_name, raiser_age, benificiary_relation, description, city, pinCode, state, district) {

    let urlParamsObject = { amount, category, sub_category, raiser_name, raiser_age, benificiary_relation, description, city, pinCode, state, district };
    let query = objectToUrlQuery(urlParamsObject);

    try {
        let data = await axios_instance.get(`/api/user_api/fund_raiser/ai_description?${query}`)

        let response = data?.data;
        if (response.status) {
            let AI_Description = response.data
            return AI_Description
        } else {
            return false
        }
    } catch (e) {
        return false;
    }
}


async function onDescriptionSubmit(val, successCB, errorCB) {

    let session = await getSession();
    let user = userDetailsFromGetSession(session)

    let { ai_description, currentApplication } = val

    if (user) {
        const token = user.token

        console.log("User found");

        try {

            let requestAPI = await API_axiosInstance.patch(`/fund_raise/edit/${currentApplication}`, {
                description: ai_description
            }, {
                headers: {
                    "authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            })

            console.log(currentApplication);

            let response = requestAPI.data;
            console.log(response);
            if (response.status) {
                successCB()
            } else {
                errorCB(response.msg)
            }

        } catch (e) {
            let errorMessage = e?.response?.body?.msg;
            let statusCode = e?.response?.status;
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