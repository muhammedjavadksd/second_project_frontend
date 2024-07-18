import { AdminResetPassword } from '@/util/types/InterFace/FormInitialValues';
import * as yup from 'yup';

export let resetPasswordInitialValues: AdminResetPassword = {
    password: null,
    confirm_password: null,
    token: null
}

export let resetPasswordValidation = yup.object().shape({
    password: yup.string().required("Password is required").typeError("Please enter valid password"),
    confirm_password: yup.string().required("Confirm password is required").oneOf([yup.ref("password")], "Password & Confirm password must be same").typeError("Please enter valid password")
})