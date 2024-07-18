
import * as yup from 'yup'

const addressInitialValues = {
    city: '',
    pinCode: '',
    state: '',
    district: '',
    fullAddress: '',
};

const addressValidationSchema = yup.object({
    city: yup.string("Please enter valid city").required('City is required'),
    pinCode: yup.number("Please enter valid pincode").required('Pin code is required'),
    state: yup.string("Please enter valid state").required('State is required'),
    district: yup.string("Please enter valid district").required('District is required'),
    fullAddress: yup.string("Please enter valid full address").required('Full address is required'),
});

export { addressInitialValues, addressValidationSchema }