import { AdminForgetPassword } from '@/util/types/InterFace/FormInitialValues';
import * as yup from 'yup';

export const resetPasswordValidation = yup.object().shape({
    email_address: yup.string().email("Please enter valid email address").required("Email address is required").typeError("Please enter valid email address")
})

export const resetPasswordInitialValues: AdminForgetPassword = {
    email_address: ''
}