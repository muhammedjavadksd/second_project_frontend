import * as yup from 'yup'

const initialValuesForCreate = {
    amount: null,
    category: null,
    sub_category: null,
    phone_number: null,
    email_id: null,
}

const createInitialValidation = yup.object().shape({
    amount: yup.number().typeError("Please enter valid number").min(2000, "Please enter minimum 2000-/").required("Amount field is required"),
    category: yup.string().trim().typeError("Please select valid category").required("category field is required"),
    sub_category: yup.string().trim().typeError("Please select valid sub category").required("sub category field is required"),
    phone_number: yup.number().typeError("Please enter valid phone number").test("10 digit", "Please enter valid phone number", (val) => val.toString().trim().length == 10).required("Phone number is requied"),
    email_id: yup.string().trim().typeError("Please enter valid email id").email("Please enter valid email id").required("Email id is required")
})

export { createInitialValidation, initialValuesForCreate }
