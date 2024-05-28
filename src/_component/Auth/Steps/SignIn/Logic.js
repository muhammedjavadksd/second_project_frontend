
import { OTP_LENGTH } from '@/app/const/const'
import axios_instance from '@/external/axios/axios-instance'
import * as yup from 'yup'


export function loginStepIndexUp(state) {
    state((prev) => prev + 1)
}

export function loginStepDown(state) {
    state((prev) => prev - 1)
}

export let onLoginSubmit = function (values, successCB, errorCB) {

    let dataSignIn = { email: values.email }
    console.log("The data is", dataSignIn);

    axios_instance.post("/api/auth/login_cred", dataSignIn).then(async (data) => {
        console.log(data);
        let response = await data.data;
        console.log(response);
        if (response.status) {
            successCB()
        } else {
            errorCB(response.msg)
        }
    }).catch((err) => {
        errorCB("Something went wrong")
        console.log(err);
    })
}

export let otpValidaor = yup.object().shape({
    otp_number: yup.number("Please enter valid otp number").required("Otp field is required").test("len", `Please enter ${OTP_LENGTH} digit OTP number`, (val) => val.toString().length == OTP_LENGTH)
})

export let otpInitialValues = {
    otp_number: null
}

export async function onLoginOtpSubmit(values, onsuccessCB, errorCB) {

    try {
        let otp_number = values.otp_number

        let request = await axios_instance.post("/api/auth/login_otp", {
            otp_number
        })
        let response = request.data;
        if (response.status) {
            onsuccessCB()
        } else {
            errorCB(response.msg)
        }
    } catch (E) {
        console.log(e);
        errorCB("Something went wrong")
    }
}

