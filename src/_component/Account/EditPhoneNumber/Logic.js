import { getUserDetails } from "@/app/_util/helper/authHelper";
import axios_instance from "@/external/axios/axios-instance";
import { getSession } from "next-auth/react";


export async function onPhoneNumberUpdate(values, successCB, errorCB) {


    try {

        let session = await getSession();
        let user = getUserDetails(session)

        console.log(values);


        let { phone_number } = values;
        let sendotp = await axios_instance.patch("/api/user_api/profile/edit_phone_number", {
            phone_number
        }, {
            headers: {
                "authorization": `Bearer ${user.token}`
            }
        });

        let response = sendotp.data;
        console.log(response);

        if (response.status) {
            successCB()
        } else {
            errorCB(response.msg)
        }
    } catch (e) {
        console.log("This has been worked");
        console.log(e.response.data);
        let ErrorMsg = e?.response?.data?.msg ?? "Something went wrong";
        console.log(e.response);
        errorCB(ErrorMsg)
    }
}

export async function onOTPValidate(values, successCB, errorCB) {
    try {


        console.log("Reached here123");

        console.log(values);
        let session = await getSession();
        let user = getUserDetails(session)

        let { otp } = values;
        console.log("The otp is : " + otp);
        let sendotp = await axios_instance.patch("/api/user_api/profile/otp_validate", {
            otp_number: otp,
            otp_type: "PHONE"
        }, {
            headers: {
                "authorization": `Bearer ${user.token}`
            }
        });

        console.log("Request has been sent");

        let response = sendotp.data;
        console.log(response);

        if (response.status) {
            successCB()
        } else {
            errorCB(response.msg)
        }
    } catch (e) {
        // let errorMessage = e?.response?.data?.msg
        console.log(e);
        console.log("This has been worked");
        console.log(e.response.data);
        let ErrorMsg = e?.response?.data?.msg ?? "Something went wrong";
        console.log(e.response);
        errorCB(ErrorMsg)
    }
}


export function phoneNumberInitialValues(phoneNumber) {

    return {
        phone_number: phoneNumber,
    }
}
export function phoneNumberWithOTPInitialValues(phoneNumber, otp) {
    return {
        phone_number: phoneNumber,
        otp
    }
};