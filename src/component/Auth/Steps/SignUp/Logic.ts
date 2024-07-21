// import { AUTH_PROVIDERS, ERROR_MSG, FRONT_END_APIENDPOINT, OTP_LENGTH, blood_groups } from '@/app/_util/_const/const';
// import { getCurrentPosition } from '@/app/_util/_const/helperFunctions';
import axios_instance from '@/util/external/axios/axios-instance';
import { toast } from 'react-toastify';
import * as yup from 'yup'
import API_axiosInstance from '@/util/external/axios/api_axios_instance';
import { AxiosResponse as CustomeAxiosResponse } from '@/util/types/API Response/FundRaiser';
import { AxiosResponse } from 'axios';
import const_data from '@/util/data/const';
import js_cookies from 'js-cookie'


function signUpIndexUp(state) {
    state((prev) => prev + 1)
}

function signUpIndexDown(state) {
    state((prev) => prev - 1)
}

async function signUpDataHandler(data) {
    console.log("Came here");


    try {
        const { first_name, last_name, phone_number, email_address, blood_group, location } = data

        const auth_id = "";
        const auth_provider = const_data.AUTH_PROVIDERS['CREDENTIAL'] //AUTH_PROVIDERS.CREDENTIAL

        const dataSignUp = { phone_number, email_address, auth_id, auth_provider, first_name, last_name, location, blood_group }

        const signUpRequets: AxiosResponse = await API_axiosInstance.post("/auth/sign_up", dataSignUp)
        const signUpResponse: CustomeAxiosResponse = signUpRequets.data;
        console.log(signUpResponse);

        if (signUpResponse.status) {
            const token = signUpResponse.data?.token;
            js_cookies.set(const_data.COOKIE_DATA_KEY.SIGN_UP_DATA, token);

            return { status: true, msg: "Account initiated success" }
        } else {
            return { status: true, msg: signUpResponse.msg ?? "Something went wrong" }
        }
    } catch (e) {
        console.log("hlo");

        console.log(e);

        const errorMsg = e.response?.data?.msg ?? "Something went wrong"
        console.log(errorMsg);

        return {
            status: false,
            msg: errorMsg
        }
    }
}


function onSignUpHandler(values, successCB, onSignUpError) {
    const userSignUpData = {
        first_name: values.first_name,
        last_name: values.last_name,
        email_address: values.email_address,
        blood_group: values.bloodGroup,
        phone_number: values.phone_number,
        location: {}
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

            const data = await signUpDataHandler(userSignUpData)
            console.log({ data });
            if (data.status) {
                toast.success("Check your email for the OTP number");
                successCB()
                //Invoce Callback for signup success
            } else {
                onSignUpError(data.msg)
            }
        } catch (e) {
            console.log("Errs");

            console.log(e);

            const errorMessage = e?.response?.data?.msg ?? "Something went wrong"
            onSignUpError(errorMessage);
        }
    }, async (err) => {
        console.log(err);
        const data = await signUpDataHandler(userSignUpData)
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

const signUpValidator = yup.object().shape({
    phone_number: yup.number().typeError("Please enter number").test("len", "Enter 10 digit phone number", (val) => val.toString().length == 10),
    first_name: yup.string().typeError("Please enter valid first name").required("First name is required"),
    last_name: yup.string().typeError("Please enter valid last name").required("Last name is required"),
    email_address: yup.string().typeError("Please enter valid email address").email("Please enter valid email address").required("Email address is required"),
    bloodGroup: yup.string().typeError("Please select valid blood group").oneOf(const_data.BLOOD_GROUPS, "Please select valid blood groups").required("Blood group is required"),
})


const signUpInitialValues = {
    first_name: null,
    last_name: null,
    email_address: null,
    phone_number: null,
    bloodGroup: null,
}

const signUpOtpInitialValues = {
    otp_number: null,
}

const otpValidator = yup.object().shape({
    otp_number: yup.number().typeError("Please enter valid otp number").test("len", `Please enter ${const_data.OTP_LENGTH} digit OTP Number`, (val) => val.toString().length == const_data.OTP_LENGTH).required("Otp number is required"),
})

const signUpOtpHandler = async function (val, successCB, errorCB) {
    const { otp_number, email_id } = val;
    console.log(val);

    try {


        const token = js_cookies.get(const_data.COOKIE_DATA_KEY.SIGN_UP_DATA);
        console.log(token);

        const otpSubmissionRequest = await API_axiosInstance.post("/auth/auth_otp_submission", {
            otp_number,
            email_id
        }, {
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            }
        })

        const response = otpSubmissionRequest.data;
        console.log(response);


        if (response.status) {
            // toast.success("OTP has been verified")
            successCB()
        } else {
            errorCB(response.msg)
        }
    } catch (e) {
        console.log(e);
        const errorMsg = e?.response?.data?.msg ?? "Something went wrong"
        errorCB(errorMsg)
    }
}



async function changeEmailIDHandler(values, successCB, errorCB) {

    const { email_id } = values;

    try {

        const token = js_cookies.get(const_data.COOKIE_DATA_KEY.SIGN_UP_DATA);
        const requestToResetEmailID = await API_axiosInstance.put("auth/edit_auth_phone", {
            email_id
        }, {
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            }
        });

        const response = requestToResetEmailID.data;
        if (response.status) {
            const { token } = response.data;
            if (token) {
                js_cookies.set(const_data.COOKIE_DATA_KEY.SIGN_UP_DATA, token);
                successCB()
            } else {
                toast.error("Please try again...")
            }
        } else {
            errorCB(response.msg)
        }
    } catch (e) {
        const errorMsg = e?.response?.data?.msg ?? "Something went wrong"
        errorCB(errorMsg)
    }
}


const changeEmailIDInitialValues = {
    email_id: null,
}

const changemailIDValidation = yup.object().shape({
    email_id: yup.string().typeError("Please enter valid email id").email("Please enter valid email id").required("Email field is required")
})

async function resendOtpHandler(successCB, errorCB) {


    try {
        console.log("Resend otp request");
        const token = js_cookies.get(const_data.COOKIE_DATA_KEY.SIGN_UP_DATA);
        const resendOtpRequest = (await API_axiosInstance.post("auth/resend_otp", {}, {
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            }
        })).data

        if (resendOtpRequest.status) {
            js_cookies.set(const_data.COOKIE_DATA_KEY.SIGN_UP_DATA, resendOtpRequest.token)
            successCB()
        } else {
            errorCB(resendOtpRequest?.msg ?? "Something went wrong")
        }
    } catch (e) {
        const errorMessage = e?.response?.data?.msg ?? "Something went wrong";
        errorCB(errorMessage)
    }

}

export {
    signUpIndexUp,
    signUpIndexDown,
    onSignUpHandler,
    signUpValidator,
    signUpInitialValues,
    signUpOtpHandler,
    otpValidator,
    signUpOtpInitialValues,
    changeEmailIDHandler,
    changemailIDValidation,
    changeEmailIDInitialValues,
    resendOtpHandler
}