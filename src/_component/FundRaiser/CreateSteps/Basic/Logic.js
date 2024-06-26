import { getUserDetails } from "@/app/_util/helper/authHelper";
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
    let user = getUserDetails(session)
    if (user) {


        // console.log(session);
        // console.log(val);
        // return;


        try {
            let { amount, category, sub_category, phone_number, email_id } = val;
            let createRequest = await axios_instance.post("/api/user_api/fund_raiser/create", {
                amount, category, sub_category, phone_number, email_id
            }, {
                headers: {
                    "authorization": `Bearer ${user.token}`
                }
            });
            let response = createRequest.data;
            if (response.status) {
                console.log(response);
                let fund_id = response.fund_id



                store.dispatch(updateFundRaiseData({
                    data: {
                        amount,
                        category,
                        sub_category,
                        phone_number,
                        email_id
                    }
                }))
                successCB(fund_id);
            } else {
                if (createRequest.status == 401) {
                    errorCB({ msg: "Un Authraized", statusCode: 401 })
                } else {
                    errorCB({ msg: response.msg ?? "Something went wrong", statusCode: createRequest.status ?? 500 })
                }
            }
        } catch (e) {
            let statusCode = e?.response?.status ?? 500;
            console.log(statusCode);
            console.log(e);
            let errorMsg = e?.response?.data?.msg ?? "Something went wrong";
            errorCB({ msg: errorMsg, statusCode })
        }
    } else {
        errorCB({ msg: response.msg ?? "Something went wrong", statusCode: 401 })
    }
}

export { onInitialCreate }