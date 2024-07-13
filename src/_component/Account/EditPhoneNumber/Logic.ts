import { userDetailsFromGetSession } from "@/app/_util/helper/authHelper";
import API_axiosInstance from "@/external/axios/api_axios_instance";
import axios_instance from "@/external/axios/axios-instance";
import { getSession } from "next-auth/react";


export async function onPhoneNumberUpdate(values: { phone_number: number }, successCB: Function, errorCB: Function): Promise<void> {

    try {

        const session = await getSession();
        const user = userDetailsFromGetSession(session)

        const { phone_number } = values;
        const token = user.token

        let changePhoneNumber = await API_axiosInstance.patch("/profile/update_phone_number", {
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
        let ErrorMsg: string = e?.response?.data?.msg ?? "Something went wrong";
        errorCB(ErrorMsg)
    }
}

export async function onOTPValidate(otp: number, successCB: Function, errorCB: Function): Promise<void> {
    try {

        const session = await getSession();
        const user = userDetailsFromGetSession(session)
        const token = user.token

        let otpValidate = await API_axiosInstance.patch("/profile/profile_update_otp_submission", {
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
        let ErrorMsg: string = e?.response?.data?.msg ?? "Something went wrong";
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