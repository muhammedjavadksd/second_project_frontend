import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import axios_instance from "@/util/external/axios/axios-instance";
import { AdminForgetPassword, AdminResetPassword } from "@/util/types/InterFace/FormInitialValues";
import axios from "axios";
import { getSession } from "next-auth/react";
import { userDetailsFromGetSession } from "./authHelper";



export async function onEmailUpdate(values: { email: string }, successCB: Function, errorCB: Function) {

    try {
        const { email } = values;
        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user")
        const token = user.token;
        const emailUpdate = await API_axiosInstance.patch("/profile/update_email_id", {
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
        const ErrorMsg: string = e?.response?.data?.msg ?? "Something went wrong";
        errorCB(ErrorMsg)
    }
}

export async function onOTPValidate(values: { otp: number }, successCB: Function, errorCB: Function) {
    try {

        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user")
        const token = user.token;
        const { otp } = values;
        const otpValidate = await API_axiosInstance.patch("/profile/profile_update_otp_submission", {
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
        const ErrorMsg: string = e?.response?.data?.msg ?? "Something went wrong";
        errorCB(ErrorMsg)
    }
}


export async function onAdminForgetPassword(values: AdminForgetPassword, successCB: Function, errorCB: Function): Promise<void> {

    const { email_address } = values;
    try {

        const resetRequest = await axios_instance.post("/api/admin_api/auth/forget_password", {
            email_address
        });

        const response = resetRequest.data;
        if (response.status) {
            successCB()
        } else {
            const errorMessage: string = response.msg ?? "Something went wrong"
            errorCB(errorMessage)
        }
    } catch (e) {
        let errorMessage: string = e?.response?.data?.msg ?? "Something went wrong";
        errorCB(errorMessage)
    }
    console.log(values);
}

export async function onAdminResetPassword(values: AdminResetPassword, successCB: Function, errorCB: Function): Promise<void> {
    let { password, token } = values;

    try {

        let apiRequest = await API_axiosInstance.post(`/auth/admin/reset_password/${token}`, {
            password: password
        })


        const response = apiRequest.data;

        if (response.status) {
            successCB()
        } else {
            errorCB(response.msg ?? "Something went wrong")
        }
    } catch (e) {
        console.log(e);
        const errorMessage = e?.response?.data?.msg ?? "Something went wrong";
        errorCB(errorMessage)
    }
}



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


export async function onEditProfile(values, successCB, errorCB) {

    try {

        const { first_name, last_name } = values;

        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user")
        const token = user.token;
        console.log(token);



        const editProfileEndPoint = await API_axiosInstance.patch("/profile/update_profile", {
            user_profile: {
                first_name,
                last_name
            }
        }, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })


        const response = editProfileEndPoint.data;
        console.log(response);
        if (response.status) {
            successCB()
        } else {
            const errorMsg = response.msg ?? "Something went wrong";
            errorCB(errorMsg)
        }

    } catch (e) {
        console.log(e);

        const errorMsg = e?.response?.body?.msg ?? "Something went wrong";
        errorCB(errorMsg)
    }

}