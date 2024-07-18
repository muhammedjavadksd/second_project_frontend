import { IOrganizationResetPassword } from "@/util/types/InterFace/FormInitialValues";
import * as yup from 'yup'

const OrganizationResetPasswordInitialValues: IOrganizationResetPassword = {
    password: "",
    confirm_password: "",
    token: null,
}

const OrganizationResetPasswordValidation = yup.object().shape({
    password: yup.string().typeError("Please enter valid password").required("Please enter valid passsword"),
    confirm_password: yup.string().typeError("Please enter valid password").oneOf([yup.ref('password'), null], 'Passwords must match').required("Please enter valid passsword")
})


export { OrganizationResetPasswordInitialValues, OrganizationResetPasswordValidation }
