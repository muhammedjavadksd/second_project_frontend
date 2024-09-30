// import { userDetailsFromGetSession } from "@/app/_util/helper/authHelper";
import { userDetailsFromGetSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import axios_instance from "@/util/external/axios/axios-instance";
import { getSession } from "next-auth/react";


export async function onPhoneNumberUpdate(values: { phone_number: number }, successCB: Function, errorCB: Function): Promise<void> {

    try {

        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user")

        const { phone_number } = values;
        const token = user.token

        const changePhoneNumber = await API_axiosInstance.patch("/profile/update_phone_number", {
            new_phone_number: phone_number
        }, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        const response = changePhoneNumber.data;
        if (response.status) {
            successCB()
        } else {
            errorCB(response.msg)
        }
    } catch (e) {
        const ErrorMsg: string = e?.response?.data?.msg ?? "Something went wrong";
        errorCB(ErrorMsg)
    }
}

export async function onOTPValidate(otp: number, successCB: Function, errorCB: Function): Promise<void> {
    try {

        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user")
        const token = user.token

        const otpValidate = await API_axiosInstance.patch("/profile/profile_update_otp_submission", {
            otp_number: otp,
            otp_type: "PHONE",
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
        const ErrorMsg: string = e?.response?.data?.msg ?? "Something went wrong";
        errorCB(ErrorMsg)
    }
}


export function phoneNumberInitialValues(phoneNumber: number): { phone_number: number, otp: number } {
    return {
        phone_number: phoneNumber,
        otp: null
    }
}
export function phoneNumberWithOTPInitialValues(phoneNumber, otp): { phone_number: number, otp: number } {
    return {
        phone_number: phoneNumber,
        otp
    }
};