
import const_data, { COOKIE_DATA_KEY, FRONT_END_APIENDPOINT, OTP_LENGTH } from '@/app/_util/_const/const'
import { userDetailsFromGetSession } from '@/app/_util/helper/authHelper'
import API_axiosInstance from '@/external/axios/api_axios_instance'
import axios_instance from '@/external/axios/axios-instance'
import { getSession, signIn } from 'next-auth/react'
// import { cookies } from 'next/headers'
import js_cookies from 'js-cookie'
import * as yup from 'yup'
// import { cookies } from 'next/headers'


export function loginStepIndexUp(state) {
    state((prev) => prev + 1)
}

export function loginStepDown(state) {
    state((prev) => prev - 1)
}

export let onLoginSubmit = async function (values, successCB, errorCB) {

    let email = values.email

    try {

        let loginRequest = await API_axiosInstance.post("/auth/sign_in", {
            email
        })
        let response = loginRequest.data;

        console.log("The response is:");
        console.log(response);

        if (response && response?.status) {

            let { token } = response.data;
            // console.log(token);
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
        let errorMessage = e?.response?.data?.msg ?? "Something went wrong"
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

export let otpValidaor = yup.object().shape({
    otp_number: yup.number("Please enter valid otp number").required("Otp field is required").test("len", `Please enter ${const_data.OTP_LENGTH} digit OTP number`, (val) => val.toString().length == const_data.OTP_LENGTH)
})

export let otpInitialValues = {
    otp_number: ''
}

export async function onLoginOtpSubmit(values, onsuccessCB, errorCB) {

    let user = await getSession();
    let userDetails = userDetailsFromGetSession(user)
    console.log(user);

    try {
        let otp_number = values.otp_number
        let token = js_cookies.get(const_data.COOKIE_DATA_KEY.SIGN_IN_DATA);

        console.log(token);
        signIn("credentials", { otp_number, redirect: false, auth_type: "user", token: token }).then((data) => {
            if (data.ok) {
                onsuccessCB()
            } else {
                errorCB("Invalid OTP or OTP has been expired")
            }
        }).catch((err) => {
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
        let response = data.data;
        if (response.status) {
            successCB()
        } else {
            errorCB(response.msg)
        }
    }).catch((err) => {
        errorCB("Something went wrong")
    })

}
