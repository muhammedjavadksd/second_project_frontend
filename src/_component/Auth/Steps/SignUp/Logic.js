import { COOKIE_DATA_KEY, ERROR_MSG, FRONT_END_APIENDPOINT, OTP_LENGTH, blood_groups } from '@/app/const/const';
import { getCurrentPosition } from '@/app/const/helperFunctions';
import axios_instance from '@/external/axios/axios-instance';
import { toast } from 'react-toastify';
import * as yup from 'yup'

function signUpIndexUp(state) {
    state((prev) => prev + 1)
}

function signUpIndexDown(state) {
    state((prev) => prev - 1)
}

async function signUpDataHandler(data) {

    console.log("This worked");
    try {
        let sendRequest = await axios_instance.post("/api/auth/signup_cred", data);
        let response = sendRequest.data;
        return response;
    } catch (e) {
        console.log("This worked", e);
        let errorMsg = e.response?.data?.msg ?? "Something went wrong"
        console.log("The error is : " + errorMsg);
        return {
            status: false,
            msg: errorMsg
        }
    }
}


function onSignUpHandler(values, successCB, onSignUpError) {
    let userSignUpData = {
        first_name: values.first_name,
        last_name: values.last_name,
        email_address: values.email_address,
        blood_group: values.bloodGroup,
        phone_number: values.phone_number,

    }


    getCurrentPosition(async (location) => {
        console.log(location);
        if (location.coords) {
            userSignUpData.location = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            };
        }
        try {
            let data = await signUpDataHandler(userSignUpData)
            console.log({ data });
            if (data.status) {
                toast.success("Sign Up Success");
                successCB()
                //Invoce Callback for signup success
            } else {
                onSignUpError(data.msg)
            }
        } catch (e) {
            console.log(e);
            onSignUpError("Something went wrong");
        }
    }, async (err) => {
        console.log(err);
        let data = await signUpDataHandler(userSignUpData)
        console.log(data);
        console.log("API after error");
        if (data.status) {
            // onSignUpError("Sign Up Success");
            successCB()
            //Invoce Callback for signup success
        } else {
            onSignUpError(data.msg)
        }
    })

}

let signUpValidator = yup.object().shape({
    phone_number: yup.number("Please enter number").test("len", ERROR_MSG.PHONE_NUMBER_VALIDATION, (val) => val.toString().length == 10),
    first_name: yup.string("Please enter valid first name").required("First name is required"),
    last_name: yup.string("Please enter valid last name").required("Last name is required"),
    email_address: yup.string("Please enter valid email address").email("Please enter valid email address").required("Email address is required"),
    bloodGroup: yup.string("Please select valid blood group").oneOf(blood_groups, "Please select valid blood groups").required("Blood group is required"),
})

let signUpInitialValues = {
    first_name: null,
    last_name: null,
    email_address: null,
    phone_number: null,
    bloodGroup: null,
}

let signUpOtpInitialValues = {
    otp_number: null,
}

let otpValidator = yup.object().shape({
    otp_number: yup.number("Please enter valid otp number").test("len", `Please enter ${OTP_LENGTH} digit OTP Number`, (val) => val.toString().length == OTP_LENGTH).required("Otp number is required"),
})

let signUpOtpHandler = async function (val, onCb) {
    let { otp_number, email_id } = val;
    console.log(val);

    try {


        let signupOtpRequest = await axios_instance.post("/api/auth/signup_otp", {
            otp_number
        })
        let response = signupOtpRequest.data;

        if (response.status) {
            toast.success("OTP has been verified")
            onCb()
        } else {
            toast.success(response.msg)
            onCb()
        }
    } catch (e) {
        toast.success("Something went wrong")
        onCb()
    }
}

function clickMe() {
    alert("Hello world")
    toast.success("Something went wrong")
}


async function changeEmailIDHandler(values, successCB, errorCB) {

    let { email_id } = values;

    try {

        let changeReqAPI = await axios_instance.post(FRONT_END_APIENDPOINT.RESET_USER_SIGNUP_EMAIL_ID, {
            email_id
        });
        let response = changeReqAPI.data;
        if (response.status) {
            successCB()
        } else {
            errorCB(response.msg)
        }
    } catch (e) {
        errorCB("Something went wrong")
    }
}


let changeEmailIDInitialValues = {
    email_id: null,
}

let changemailIDValidation = yup.object().shape({
    email_id: yup.string("Please enter valid email id").email("Please enter valid email id").required("Email field is required")
})

function resendOtpHandler(successCB, errorCB) {


    console.log("Resend otp request");
    axios_instance.post(FRONT_END_APIENDPOINT.RESENT_USER_SIGN_EMAIL_ID, null).then((data) => {
        let response = data.data;
        if (response.status) {
            successCB()
        } else {
            errorCB(response.msg)
        }
    }).catch((err) => {
        console.log(err);
        errorCB("Something went wrong")
    })
}

module.exports = {
    signUpIndexUp,
    signUpIndexDown,
    onSignUpHandler,
    signUpValidator,
    signUpInitialValues,
    signUpOtpHandler,
    otpValidator,
    signUpOtpInitialValues,
    clickMe,
    changeEmailIDHandler,
    changemailIDValidation,
    changeEmailIDInitialValues,
    resendOtpHandler
}