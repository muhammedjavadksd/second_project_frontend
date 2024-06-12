import { getUserDetails } from "@/app/_util/helper/authHelper";
import axios_instance from "@/external/axios/axios-instance";
import { getSession } from "next-auth/react";


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

                successCB(fund_id);
            } else {
                errorCB({ msg: response.msg ?? "Something went wrong", statusCode: createRequest.status ?? 500 })
            }
        } catch (e) {
            let statusCode = e?.response?.status ?? 500;
            console.log(statusCode);
            console.log(e);
            let errorMsg = e?.response?.data?.msg ?? "Something went wrong";
            errorCB({ msg: errorMsg, statusCode })
        }
    } else {
        errorCB({ msg: response.msg ?? "Something went wrong", statusCode: createRequest.status ?? 500 })
    }
}

export { onInitialCreate }