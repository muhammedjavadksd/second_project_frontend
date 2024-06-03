import * as yup from 'yup'


export let editEmailAddressValidation = yup.object().shape({
    email: yup.string("Please enter valid email address").email("Please enter valid email address").required("Email address is required")
})

export let editEmailAddressValidationWithOTP = yup.object().shape({
    email: yup.string("Please enter valid email address").email("Please enter valid email address").required("Email address is required"),
    otp: yup.string()
        .matches(/^[0-9]{6}$/, 'OTP must be exactly 6 digits')
        .required('OTP is required'),
})