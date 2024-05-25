import { ERROR_MSG, OTP_LENGTH, blood_groups } from '@/app/const/const';
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


    console.log("Passing data is : ", data);
    try {
        let sendRequest = await axios_instance.post("/api/auth/signup_cred", data);
        console.log(sendRequest);
        return sendRequest.data;
    } catch (e) {
        console.log("This worked");
        return Promise.reject()
    }
}


function onSignUpHandler(values, successCB) {
    let userSignUpData = {
        first_name: values.first_name,
        last_name: values.last_name,
        email_address: values.email_address,
        blood_group: values.bloodGroup,
        phone_number: values.phone_number,
    }

    console.log(userSignUpData);

    try {

        getCurrentPosition(async (location) => {
            console.log(location);
            if (location.coords) {
                userSignUpData.location = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                };
            }
            console.log("The loca", userSignUpData);
            let data = await signUpDataHandler(userSignUpData)
            console.log({ data });
            if (data.status) {
                toast.success("Sign Up Success");
                successCB()
                //Invoce Callback for signup success
            } else {
                toast.error(data.msg)
            }
        }, async (err) => {
            console.log(err);
            console.log("Error worked");
            let data = await signUpDataHandler(userSignUpData)
            if (data.status) {
                toast.success("Sign Up Success");
                successCB()
                //Invoce Callback for signup success
            } else {
                toast.error(data.msg)
            }
        })
    } catch (e) {
        toast.error("Something went wrong");
    }
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
    email_id: "muhammedjavad119144@gmail.com"
}

let otpValidator = yup.object().shape({
    otp_number: yup.number("Please enter valid otp number").test("len", `Please enter ${OTP_LENGTH} digit OTP Number`, (val) => val.toString().length == OTP_LENGTH),
    email_id: yup.string("Something went wrong").email("You do not have valid email id-").required("You do not have valid email id")
})

let signUpOtpHandler = async function (val) {
    let { otp_number, email_id } = val;
    console.log(val);

    try {
        let signupOtpRequest = await axios_instance.post("/api/auth/signup_otp", {
            otp_number,
            email_id: email_id
        })
        let response = signupOtpRequest.data;
        if (response.status) {
            toast.success("OTP has been verified")
        } else {
            toast.success(response.msg)
        }
    } catch (e) {
        toast.success("Something went wrong")
    }
}

module.exports = {
    signUpIndexUp,
    signUpIndexDown,
    onSignUpHandler,
    signUpValidator,
    signUpInitialValues,
    signUpOtpHandler,
    otpValidator,
    signUpOtpInitialValues
}