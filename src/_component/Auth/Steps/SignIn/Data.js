import * as yup from 'yup'

export let loginValidation = yup.object().shape({
    email: yup.string("Please enter valid email address").email("Please enter valid email address").required("Email address is required")
})

export let loginInitValues = {
    email: ''
}




