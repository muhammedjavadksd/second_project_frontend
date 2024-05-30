import * as yup from 'yup';

export let resetPasswordValidation = yup.object().shape({
    email_address: yup.string("Please enter valid email address").email("Please enter valid email address").required("Email address is required")
})

export let resetPasswordInitialValues  = {
    email_address: null
}