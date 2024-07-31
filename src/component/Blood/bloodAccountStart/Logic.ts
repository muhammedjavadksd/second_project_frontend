import { userDetailsFromGetSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import { getSession } from "next-auth/react";


async function onBloodDonationSubmit(val, successCB, errorCb) {

    try {
        const {
            full_name,
            phone_number,
            email_address,
            location,
            blood_group
        } = val;

        const session = await getSession();
        const user = userDetailsFromGetSession(session)
        const token = user.token;

        const openAccountApi = await API_axiosInstance.post("/blood/create", {
            full_name,
            email_address,
            phone_number,
            bloodGroup: blood_group,
            location
        }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const response = openAccountApi.data;
        console.log(response);

        if (response.status) {
            const { donor_id } = response.data
            const { token } = response.data
            await API_axiosInstance.patch("/auth/update_auth", { blood_token: token }, { headers: { authorization: `Bearer ${token}` } })
            successCB(donor_id)
        } else {
            errorCb(response.msg)
        }
    } catch (e) {
        const errorMsg = e?.response?.body?.msg ?? "Something went wrong";
        errorCb(errorMsg)
    }


}

async function OnBloodGroupUpdate(val, successCB, errorCB) {
    console.log(val);

    const updateBloodGroup = await API_axiosInstance.post("/blood/group_change_request", {})


}

export { onBloodDonationSubmit, OnBloodGroupUpdate }