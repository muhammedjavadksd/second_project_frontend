// import { userDetailsFromGetSession } from "@/app/_util/helper/authHelper";
import { userDetailsFromGetSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import axios_instance from "@/util/external/axios/axios-instance";
// import combineStoreReducers from "@/external/redux/combineSlicer";
import { updateFundRaiseData } from "@/util/external/redux/slicer/fundRaiserForm";
import store from "@/util/external/redux/store/store";
// import { combineReducers } from "@reduxjs/toolkit";
// import { updateData } from "@/external/redux/slicer/fundRaiserForm";
import { getSession } from "next-auth/react";
// combineReducers




async function onInitialCreate(val, successCB, errorCB) {


    console.log("Data has been transferd");

    // console.log('The values are');
    const session = await getSession();
    const user = userDetailsFromGetSession(session, "user")
    console.log("Check");
    console.log(user);
    if (user) {
        const token = user.token

        try {
            const { amount, category, sub_category, phone_number, email_id } = val;
            const createEndPoint = await API_axiosInstance.post("/fund_raise/create", {
                amount, category, sub_category, phone_number, email: email_id
            }, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })

            const response = createEndPoint.data;
            if (response.status && response.data) {

                console.log(response);
                const fund_id = response.data?.fund_id;
                if (fund_id) {







                    store.dispatch(updateFundRaiseData({
                        data: {
                            amount,
                            category,
                            sub_category,
                            phone_number,
                            email_id,
                        }
                    }))
                    console.log(fund_id);
                    successCB(fund_id);
                } else {
                    errorCB({ msg: "Internal sever error", statusCode: 500 })
                }

            } else {
                if (createEndPoint.status == 401) {
                } else {
                    errorCB({ msg: response.msg ?? "Something went wrong", statusCode: createEndPoint.status ?? 500 })
                }
            }
        } catch (e) {
            // alert("This work")
            const statusCode = e?.response?.status ?? 500;
            console.log(e);
            const errorMsg = e?.response?.data?.msg ?? "Something went wrong";
            errorCB({ msg: errorMsg, statusCode })
        }
    } else {
        errorCB({ msg: "Un Authenticated", statusCode: 401 })
    }
}

export { onInitialCreate }