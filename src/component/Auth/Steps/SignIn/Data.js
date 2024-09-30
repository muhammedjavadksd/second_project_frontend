import * as yup from 'yup'

export const loginValidation = yup.object().shape({
    email: yup.string("Please enter valid email address").email("Please enter valid email address").required("Email address is required")
})

export const loginInitValues = {
    email: ''
}




