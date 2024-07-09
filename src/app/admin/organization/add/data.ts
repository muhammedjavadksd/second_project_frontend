import { OrganizationInitialValues } from '@/types/InterFace/FormInitialValues';
import * as Yup from 'yup'

export const initialValues: OrganizationInitialValues = {
    name: '',
    phone_number: 0,
    email_address: '',
    password: '',
    blood_service: '',
    fund_service: '',
    organization_type: '',
    website_url: '',
    logo_photo: '',
    office_photo: '',
    registration_photo: '',
    pan_card: ''
};


export const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone_number: Yup.number().typeError("Please enter a valid number").required('Phone number is required'),
    email_address: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    blood_service: Yup.string().required('Blood services field is required'),
    fund_service: Yup.string().required('Fund raise services field is required'),
    organization_type: Yup.string().required('Organization type is required'),
    logo_photo: Yup.string().required('Logo selection is required'),
    website_url: Yup.string().url('Invalid URL').required('Website URL is required'),
    office_photo: Yup.string().required('Office photo upload is required'),
    registration_photo: Yup.string().required('Registration photo upload is required'),
    pan_card: Yup.string().required('Pan card photo upload is required')
});