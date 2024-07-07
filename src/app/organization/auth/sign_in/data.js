
import * as yup from 'yup'

export let organizationLoginInitialValues = {
    email_address: "",
    password: ""
}

export let organizationLoginValidation = yup.object().shape({
    email_address: yup.string("Please enter valid email address").email("Please enter valid email address").required("Email address is required"),
    password: yup.string("Please enter valid password").required("Password is required")
})