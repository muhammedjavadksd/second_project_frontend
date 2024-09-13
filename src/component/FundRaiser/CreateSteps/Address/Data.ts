
import { IAddressFormInitialValues } from '@/util/types/InterFace/FormInitialValues';
import * as yup from 'yup'

const addressInitialValues: IAddressFormInitialValues = {
    city: '',
    pinCode: null,
    state: '',
    district: '',
    fullAddress: '',
};

const addressValidationSchema = yup.object({
    city: yup.string().typeError("Please enter valid city").required('City is required'),
    pinCode: yup.number().typeError("Please enter valid pincode").required('Pin code is required'),
    state: yup.string().typeError("Please enter valid state").required('State is required'),
    district: yup.string().typeError("Please enter valid district").required('District is required'),
    fullAddress: yup.string().typeError("Please enter valid full address").required('Full address is required'),
});

export { addressInitialValues, addressValidationSchema }