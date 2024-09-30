import { AdminSignIn } from '@/util/types/InterFace/FormInitialValues'
import * as yup from 'yup'


export const adminSignInInitialValues: AdminSignIn = {
    email: null,
    password: null
}

export let adminSignInValidation = yup.object().shape({
    email: yup.string().email("Please enter valid email address").required("Email address is required").typeError("Please enter valid password"),
    password: yup.string().required("Please enter valid password").typeError("Please enter valid password")
})
