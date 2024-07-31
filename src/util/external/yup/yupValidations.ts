
import { BloodGroup } from '@/util/types/Enums/BasicEnums'
import * as yup from 'yup'

const bloodDonatationFormValidation = yup.object().shape({
    full_name: yup.string().typeError("Please enter valid full name").required("Full name is required"),
    phone_number: yup.number().typeError("Please enter valid phone number").required("Phone number is required"),
    email_address: yup.string().email("Please enter valid email address").typeError("Please enter valid email address").required("Email address is required"),
    location: yup.string().optional(),
    blood_group: yup.string().typeError("Please select valid blood group").oneOf(Object.values(BloodGroup), "Please select valid blood group").required("Blood group is required")
})

const updateBloodGroupValidation = yup.object().shape({
    blood_group: yup.string().typeError("Please select valid blood group").oneOf(Object.values(BloodGroup), "Please select valid blood group").required("Blood group is required"),
    certificate: yup.mixed().required("Please upload certificate")
})

export { bloodDonatationFormValidation, updateBloodGroupValidation }