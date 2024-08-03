
import { BloodGroup } from '@/util/types/Enums/BasicEnums'
import * as yup from 'yup'

const bloodDonatationFormValidation = yup.object().shape({
    full_name: yup.string().typeError("Please enter valid full name").required("Full name is required"),
    phone_number: yup.number().typeError("Please enter valid phone number").required("Phone number is required"),
    email_address: yup.string().email("Please enter valid email address").typeError("Please enter valid email address").required("Email address is required"),
    location: yup.string().optional(),
    blood_group: yup.string().typeError("Please select valid blood group").oneOf(Object.values(BloodGroup), "Please select valid blood group").required("Blood group is required")
})

const updateDonorPersonDetailsValidation = yup.object().shape({
    full_name: yup.string().typeError("Please enter valid full name").required("Full name is required"),
    phone_number: yup.number().typeError("Please enter valid phone number").required("Phone number is required"),
    email_address: yup.string().email("Please enter valid email address").typeError("Please enter valid email address").required("Email address is required"),
    location: yup.string().optional(),
})

const updateBloodGroupValidation = yup.object().shape({
    blood_group: yup.string().typeError("Please select valid blood group").oneOf(Object.values(BloodGroup), "Please select valid blood group").required("Blood group is required"),
    certificate: yup.mixed().required("Please upload certificate")
})

const bloodRequestPersonalDetailsValidation = yup.object().shape({
    patient_name: yup.string().typeError("Please enter valid name").required("Patient name is required"),
    relation: yup.string().typeError("Please select valid relation").required("Relation with patient is required"),
    address: yup.string().typeError("Please enter valid address").required("Please enter valid address"),
    phone_number: yup.number().typeError("Please enter valid phone number").required("Phone number is required"),
})


export { bloodDonatationFormValidation, updateBloodGroupValidation, updateDonorPersonDetailsValidation, bloodRequestPersonalDetailsValidation }