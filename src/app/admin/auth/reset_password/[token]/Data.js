import * as yup from 'yup';

export let resetPasswordInitialValues = {
    password: null,
    confirm_password: null
}

export let resetPasswordValidation = yup.object().shape({
    password: yup.string("Please enter valid password").required("Password is required"),
    confirm_password: yup.string("Please enter valid password").required("Confirm password is required").oneOf([yup.ref("password")], "Password & Confirm password must be same")
})