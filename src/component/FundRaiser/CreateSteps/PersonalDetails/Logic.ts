// import { userDetailsFromGetSession } from "@/app/_util/helper/authHelper";
import { userDetailsFromGetSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import axios_instance from "@/util/external/axios/axios-instance";
import { updateFundRaiseData } from "@/util/external/redux/slicer/fundRaiserForm";
import store from "@/util/external/redux/store/store";
import { getSession } from "next-auth/react";



async function onPersonalDetailsSubmit(val, successCB, errorCB, onNotLogged) {

    let session = await getSession();
    let user = userDetailsFromGetSession(session, "user")

    let { benificiary_relation, description, raiser_age, raiser_name, currentApplication, deadline } = val

    if (user) {

        console.log(session);
        console.log(user);
        const token = user.token
        console.log(token);

        console.log("User found");
        console.log(val);


        try {

            let requestAPI = await API_axiosInstance.patch(`/fund_raise/edit/${currentApplication}`, {
                benificiary_relation, about: description, age: raiser_age, full_name: raiser_name, deadline
            }, {
                headers: {
                    "authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })

            let response = requestAPI.data;
            console.log(requestAPI);
            if (response.status) {
                store.dispatch(updateFundRaiseData({
                    data: {
                        benificiary_relation,
                        description,
                        raiser_age,
                        raiser_name,
                    }
                }))
                successCB()
            } else {
                if (requestAPI.status == 401) {
                    onNotLogged()
                } else {
                    errorCB(response.msg)
                }
            }

        } catch (e) {
            let errorMessage = e?.response?.body?.msg;
            let statusCode = e?.response?.status;
            console.log(e);
            console.log(errorMessage);
            if (statusCode == 401) {
                onNotLogged()
            } else {
                errorCB(errorMessage)
            }
        }
    } else {
        onNotLogged()
    }
}

export { onPersonalDetailsSubmit }