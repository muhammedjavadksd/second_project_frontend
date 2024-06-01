import { getUserDetails } from "@/app/_util/helper/authHelper";
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

        let session = await getSession();
        let user = getUserDetails(session)

        let editProfileEndPoint = await axios_instance.patch("/api/user_api/profile/edit_profile", {
            first_name: values.first_name,
            last_name: values.last_name
        }, {
            headers: {
                "authorization": `Bearer ${user.token}`
            }
        });

        console.log("The profile");

        let response = editProfileEndPoint.data;
        console.log(response);
        if (response.status) {
            successCB()
        } else {
            let errorMsg = response.msg ?? "Something went wrong";
            errorCB(errorMsg)
        }
    } catch (e) {
        let errorMsg = e?.response?.body?.msg ?? "Something went wrong";
        errorCB(errorMsg)
    }

}