import { getUserDetails } from "@/app/_util/helper/authHelper";
import axios_instance from "@/external/axios/axios-instance";
import { getSession } from "next-auth/react";



async function onPersonalDetailsSubmit(val, successCB, errorCB, onNotLogged) {

    let session = await getSession();
    let user = getUserDetails(session)

    let { benificiary_relation, description, raiser_age, raiser_name, currentApplication } = val

    if (user) {

        console.log("User found");

        try {
            let API_request = await axios_instance.patch("/api/user_api/fund_raiser/update", {
                benificiary_relation, about: description, age: raiser_age, full_name: raiser_name
            }, {
                headers: {
                    "authorization": `Bearer ${user.token}`,
                    "fund_id": currentApplication
                }
            })

            let response = API_request.data;
            console.log(response);
            if (response.status) {
                successCB()
            } else {
                errorCB(response.msg)
            }

        } catch (e) {
            let errorMessage = e?.response?.body?.msg;
            console.log(e);
            console.log(errorMessage);
            errorCB(errorMessage)
        }
    } else {
        onNotLogged()
    }
}

export { onPersonalDetailsSubmit }