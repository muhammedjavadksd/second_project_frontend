
import { IOrganizationSignIn } from '@/types/InterFace/FormInitialValues'
import * as yup from 'yup'

export let organizationLoginInitialValues: IOrganizationSignIn = {
    email_address: "",
    password: ""
}

export let organizationLoginValidation = yup.object().shape({
    email_address: yup.string().email("Please enter valid email address").typeError("Please enter valid email address").required("Email address is required"),
    password: yup.string().typeError("Please enter valid password").required("Password is required")
})