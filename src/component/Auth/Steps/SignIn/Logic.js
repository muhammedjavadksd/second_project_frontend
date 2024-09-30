
import const_data, { COOKIE_DATA_KEY, FRONT_END_APIENDPOINT, OTP_LENGTH } from '@/util/data/const'
// import { userDetailsFromGetSession } from '@/app/_util/helper/authHelper'
import API_axiosInstance from '@/util/external/axios/api_axios_instance'
import axios_instance from '@/util/external/axios/axios-instance'
import { getSession, signIn } from 'next-auth/react'
// import { cookies } from 'next/headers'
import js_cookies from 'js-cookie'
import * as yup from 'yup'
import { userDetailsFromGetSession } from '@/util/data/helper/authHelper'
// import { cookies } from 'next/headers'


export function loginStepIndexUp(state) {
    state((prev) => prev + 1)
}

export function loginStepDown(state) {
    state((prev) => prev - 1)
}

export const onLoginSubmit = async function (values, successCB, errorCB) {

    const email = values.email

    try {

        const loginRequest = await API_axiosInstance.post("/auth/sign_in", {
            email
        })
        const response = loginRequest.data;


        console.log("The response is:");
        console.log(response);

        if (response && response?.status) {
            console.log(response.data);

            const { token } = response.data;
            console.log(token);
            if (token) {
                js_cookies.set(const_data.COOKIE_DATA_KEY.SIGN_IN_DATA, token)
                successCB();
            } else {
                errorCB("Something went wrong")
            }
        } else {
            errorCB(response?.msg)
        }
    } catch (e) {
        console.log(e);
        const errorMessage = e?.response?.data?.msg ?? "Something went wrong"
        errorCB(errorMessage)
    }




    // axios_instance.post("/api/user_api/auth/login_cred", dataSignIn).then(async (data) => {
    //     console.log(data);
    //     let response = await data.data;
    //     console.log(response);
    //     if (response.status) {
    //         successCB()
    //     } else {
    //         errorCB(response.msg)
    //     }
    // }).catch((err) => {
    //     errorCB("Something went wrong")
    //     console.log(err);
    // })
}

export const otpValidaor = yup.object().shape({
    otp_number: yup.number("Please enter valid otp number").required("Otp field is required").test("len", `Please enter ${const_data.OTP_LENGTH} digit OTP number`, (val) => val.toString().length == const_data.OTP_LENGTH)
})

export const otpInitialValues = {
    otp_number: ''
}

export async function onLoginOtpSubmit(values, onsuccessCB, errorCB) {

    const user = await getSession();
    console.log(user);

    try {
        const otp_number = values.otp_number
        const token = js_cookies.get(const_data.COOKIE_DATA_KEY.SIGN_IN_DATA);

        console.log(token);
        // let profileApi = await API_axiosInstance.get("/profile/get_profile", {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "authorization": `Bearer ${token}`
        //     }
        // }) 
        signIn("credentials", { otp_number, redirect: false, auth_type: "user", token: token, }).then((data) => {
            if (data.ok) {
                onsuccessCB()
            } else {
                errorCB("Invalid OTP or OTP has been expired")
            }
        }).catch((err) => {
            console.log(err);
            errorCB("Something went wrong")
        })

        // let request = await axios_instance.post("/api/auth/login_otp", {
        //     otp_number
        // })
        // let response = request.data;
        // if (response.status) {
        //     onsuccessCB()
        // } else {
        //     errorCB(response.msg)
        // }
    } catch (e) {
        console.log(e);
        errorCB("Something went wrong")
    }

    // try {
    //     let otp_number = values.otp_number

    //     let request = await axios_instance.post("/api/auth/login_otp", {
    //         otp_number
    //     })
    //     let response = request.data;
    //     if (response.status) {
    //         onsuccessCB()
    //     } else {
    //         errorCB(response.msg)
    //     }
    // } catch (E) {
    //     console.log(e);
    //     errorCB("Something went wrong")
    // }
}

export async function onResetOtp(successCB, errorCB) {

    const token = js_cookies.get(const_data.COOKIE_DATA_KEY.SIGN_IN_DATA);
    API_axiosInstance.post("auth/resend_otp", {}, {
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`
        }
    }).then((data) => {

        const response = data.data;
        if (response.status) {
            const { token: newToken } = response
            js_cookies.set(const_data.COOKIE_DATA_KEY.SIGN_IN_DATA, newToken);
            successCB()
        } else {
            errorCB(response.msg)
        }
    }).catch((err) => {
        errorCB("Something went wrong")
    })

}
