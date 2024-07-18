
import { IOrganizationForgetPasswordInitialValues } from '@/util/types/InterFace/FormInitialValues'
import * as yup from 'yup'

let organizationForgetPasswordInitialValues: IOrganizationForgetPasswordInitialValues = {
    email_address: ""
}

let organizationForgetPasswordValidation = yup.object().shape({
    email_address: yup.string().typeError("Please enter valid email address").email("Please enter valid email address").required("Please enter valid email address")
})

export { organizationForgetPasswordInitialValues, organizationForgetPasswordValidation }