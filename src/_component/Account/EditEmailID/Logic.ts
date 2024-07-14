import { userDetailsFromGetSession } from "@/app/_util/helper/authHelper";
import API_axiosInstance from "@/external/axios/api_axios_instance";
import axios_instance from "@/external/axios/axios-instance";
import { getSession } from "next-auth/react";


export async function onEmailUpdate(values: { email: string }, successCB: Function, errorCB: Function) {

    try {
        const { email } = values;
        const session = await getSession();
        const user = userDetailsFromGetSession(session)
        const token = user.token;
        let emailUpdate = await API_axiosInstance.patch("/profile/update_email_id", {
            new_email_id: email
        }, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        const response = emailUpdate.data;

        if (response.status) {
            successCB()
        } else {
            errorCB(response.msg)
        }
    } catch (e) {
        let ErrorMsg: string = e?.response?.data?.msg ?? "Something went wrong";
        errorCB(ErrorMsg)
    }
}

export async function onOTPValidate(values: { otp: number }, successCB: Function, errorCB: Function) {
    try {

        const session = await getSession();
        const user = userDetailsFromGetSession(session)
        const token = user.token;
        const { otp } = values;
        let otpValidate = await API_axiosInstance.patch("/profile/profile_update_otp_submission", {
            otp_number: otp,
            otp_type: "EMAIL",
        }, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })


        const response = otpValidate.data;
        if (response.status) {
            successCB()
        } else {
            errorCB(response.msg)
        }
    } catch (e) {
        let ErrorMsg: string = e?.response?.data?.msg ?? "Something went wrong";
        errorCB(ErrorMsg)
    }
}

export function emailAddressEditInitialValues(email, otp) {
    return {
        email,
        otp
    }
}