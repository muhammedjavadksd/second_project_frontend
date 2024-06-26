import * as yup from 'yup'

let createInitialValue = {
    amount: null,
    category: null,
    sub_category: null,
    phone_number: null,
    email_id: null,
}

let createInitialValidation = yup.object().shape({
    amount: yup.number("Please enter valid number").min(2000, "Please enter minimum 2000-/").required("Amount field is required"),
    category: yup.string("Please select valid category").required("category field is required"),
    sub_category: yup.string("Please select valid sub category").required("sub category field is required"),
    phone_number: yup.number("Please enter valid phone number").test("10 digit", "Please enter valid phone number", (val) => val.toString().length == 10).required("Phone number is requied"),
    email_id: yup.string("Please enter valid email id").email("Please enter valid email id").required("Email id is required")
})

export { createInitialValidation, createInitialValue }
