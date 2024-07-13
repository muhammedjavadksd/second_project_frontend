import { userDetailsFromGetSession } from "@/app/_util/helper/authHelper";
import API_axiosInstance from "@/external/axios/api_axios_instance";
import axios_instance from "@/external/axios/axios-instance"
import { getSession } from "next-auth/react";


export function getEditProfileInitialValues(first_name, last_name) {
    return {
        first_name,
        last_name
    }
}


export async function onEditProfile(values, successCB, errorCB) {

    try {

        const { first_name, last_name } = values;

        let session = await getSession();
        let user = userDetailsFromGetSession(session)
        let token = user.token;
        console.log(token);



        let editProfileEndPoint = await API_axiosInstance.patch("/profile/update_profile", {
            user_profile: {
                first_name,
                last_name
            }
        }, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })


        let response = editProfileEndPoint.data;
        console.log(response);
        if (response.status) {
            successCB()
        } else {
            let errorMsg = response.msg ?? "Something went wrong";
            errorCB(errorMsg)
        }

    } catch (e) {
        console.log(e);

        let errorMsg = e?.response?.body?.msg ?? "Something went wrong";
        errorCB(errorMsg)
    }

}