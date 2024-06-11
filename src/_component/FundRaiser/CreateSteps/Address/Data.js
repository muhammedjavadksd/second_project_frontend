
import * as yup from 'yup'

const addressInitialValues = {
    city: '',
    pinCode: '',
    state: '',
    district: '',
    fullAddress: '',
};

const addressValidationSchema = yup.object({
    city: yup.string().required('City is required'),
    pinCode: yup.string().required('Pin code is required'),
    state: yup.string().required('State is required'),
    district: yup.string().required('District is required'),
    fullAddress: yup.string().required('Full address is required'),
});

export { addressInitialValues, addressValidationSchema }