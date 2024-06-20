import { objectToUrlQuery } from "@/app/_util/helper/authHelper";

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


export default getAIDescription