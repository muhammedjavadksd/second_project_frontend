import { userDetailsFromGetSession } from "@/app/_util/helper/authHelper";
import API_axiosInstance from "@/external/axios/api_axios_instance";
import axios_instance from "@/external/axios/axios-instance";
// import combineStoreReducers from "@/external/redux/combineSlicer";
import { updateFundRaiseData } from "@/external/redux/slicer/fundRaiserForm";
import store from "@/external/redux/store/store";
// import { combineReducers } from "@reduxjs/toolkit";
// import { updateData } from "@/external/redux/slicer/fundRaiserForm";
import { getSession } from "next-auth/react";
// combineReducers




async function onInitialCreate(val, successCB, errorCB) {


    console.log("Data has been transferd");

    // console.log('The values are');
    let session = await getSession();
    let user = userDetailsFromGetSession(session)
    if (user) {
        const token = user.token

        try {
            let { amount, category, sub_category, phone_number, email_id } = val;
            let createEndPoint = await API_axiosInstance.post("/fund_raise/create", {
                amount, category, sub_category, phone_number, email: email_id
            }, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })

            let response = createEndPoint.data;
            if (response.status && response.data) {

                console.log(response);
                let fund_id = response.data?.fund_id;
                if (fund_id) {


                    store.dispatch(updateFundRaiseData({
                        data: {
                            amount,
                            category,
                            sub_category,
                            phone_number,
                            email_id
                        }
                    }))
                    console.log(fund_id);
                    successCB(fund_id);
                } else {
                    errorCB({ msg: "Internal sever error", statusCode: 500 })
                }

            } else {
                if (createRequest.status == 401) {
                } else {
                    errorCB({ msg: response.msg ?? "Something went wrong", statusCode: createRequest.status ?? 500 })
                }
            }
        } catch (e) {
            // alert("This work")
            let statusCode = e?.response?.status ?? 500;
            console.log(statusCode);
            console.log(e);
            let errorMsg = e?.response?.data?.msg ?? "Something went wrong";
            errorCB({ msg: errorMsg, statusCode })
        }
    } else {
        errorCB({ msg: "Un Authenticated", statusCode: 401 })
    }
}

export { onInitialCreate }