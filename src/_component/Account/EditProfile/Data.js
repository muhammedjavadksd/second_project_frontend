
import * as yup from 'yup';

export let editProfileValidation = yup.object().shape({
    first_name: yup.string("Please enter valid first name").required("First name is required"),
    last_name: yup.string("Please enter valid last name").required("Last name is required")
})


