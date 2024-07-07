const { default: API_axiosInstance } = require("@/external/axios/api_axios_instance");


export async function getSingleFundRaisingProfile(fundraiser_id) {

    try {
        let profile = await API_axiosInstance.get(`/fund_raise/admin/view/${fundraiser_id}`);
        return profile.data
    } catch (e) {
        console.log(e);
        return null
    }
}