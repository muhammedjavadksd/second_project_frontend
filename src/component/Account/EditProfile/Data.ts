
import * as yup from 'yup';

export const editProfileValidation = yup.object().shape({
    first_name: yup.string().typeError("Please enter valid first name").required("First name is required"),
    last_name: yup.string().typeError("Please enter valid last name").required("Last name is required")
})


