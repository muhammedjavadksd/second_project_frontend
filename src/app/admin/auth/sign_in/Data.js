import * as yup from 'yup'


export let adminSignInInitialValues = {
    email: null,
    password: null
}

export let adminSignInValidation = yup.object().shape({
    email: yup.string("Please enter valid email address").email("Please enter valid email address").required("Email address is required"),
    password: yup.string("Please enter valid password").required("Please enter valid password")
})
