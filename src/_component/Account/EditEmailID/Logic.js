import { getUserDetails } from "@/app/_util/helper/authHelper";
import axios_instance from "@/external/axios/axios-instance";
import { getSession } from "next-auth/react";


export async function onEmailUpdate(values, successCB, errorCB) {



    try {
        let { email } = values;
        let session = await getSession();
        let user = getUserDetails(session)
        let editEmailAddress = axios_instance.patch("/api/user_api/profile/edit_email_address", {
            email
        }, {
            headers: {
                "authorization": `Bearer ${user.token}`
            }
        })

        let response = (await editEmailAddress).data;
        console.log(response);

        if (response.status) {
            successCB()
        } else {
            errorCB(response.msg)
        }
    } catch (e) {
        console.log("This has been worked");
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
            otp_type: "EMAIL"
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

export function emailAddressEditInitialValues(email, otp) {
    return {
        email,
        otp
    }
}