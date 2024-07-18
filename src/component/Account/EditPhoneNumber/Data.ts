

import * as Yup from 'yup';

export const phoneNumberSchema = Yup.object().shape({
    phone_number: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
});


export const phoneAndOTPSchema = Yup.object().shape({
    phone_number: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
    otp: Yup.string().matches(/^[0-9]{6}$/, 'OTP must be exactly 6 digits').required('OTP is required'),
});
