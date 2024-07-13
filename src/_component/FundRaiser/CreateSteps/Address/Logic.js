import { userDetailsFromGetSession } from "@/app/_util/helper/authHelper";
import API_axiosInstance from "@/external/axios/api_axios_instance";
import axios_instance from "@/external/axios/axios-instance";
import { updateFundRaiseData } from "@/external/redux/slicer/fundRaiserForm";
import store from "@/external/redux/store/store";
import { getSession } from "next-auth/react";

const onAddressSubmit = async (values, successCB, errorCB, ifNotLogged) => {
    console.log(values);
    let { city, pinCode, state, district, fullAddress, currentApplication } = values

    let session = await getSession();
    let user = userDetailsFromGetSession(session)

    // let { benificiary_relation, description, raiser_age, raiser_name, currentApplication } = val

    if (user) {

        console.log("User found");
        console.log(user.token, currentApplication);
        const token = user.token

        try {
            // let API_request = await axios_instance.patch("/api/user_api/fund_raiser/update", {
            //     city, pincode: pinCode, state, district, full_address: fullAddress
            // }, {
            //     headers: {
            //         "authorization": `Bearer ${user.token}`,
            //         "fund_id": currentApplication
            //     }
            // })

            let requestAPI = await API_axiosInstance.patch(`/fund_raise/edit/${currentApplication}`, {
                city, pincode: pinCode, state, district, full_address: fullAddress
            }, {
                headers: {
                    "authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            })

            let response = requestAPI.data;
            console.log(response);
            if (response.status) {
                store.dispatch(updateFundRaiseData({
                    data: {
                        city,
                        pinCode,
                        state,
                        district,
                        fullAddress,
                    }
                }))
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
        ifNotLogged()
    }
};

export { onAddressSubmit }