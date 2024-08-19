import * as yup from 'yup'

let addFundRaiserValidation = yup.object().shape({
    amount: yup.number().typeError("Please enter valid amount").required("Amount is required"),
    category: yup.string().typeError("Please enter valid category").required("Category is required"),
    sub_category: yup.string().typeError("Please enter valid  sub category").required("Sub category is required"),
    phone_number: yup.number().typeError("Please enter valid phone number").required("Phone number is required"),
    email: yup.string().email("Please enter valid email address").typeError("Please enter valid email id").required("Email id is required"),
    age: yup.number().typeError("Please enter valid age").required("Age is required"),
    about: yup.string().typeError("Please enter about").required("About is required"),
    description: yup.string().typeError("Please enter valid description").required("Description is required"),
    deadline: yup.date().typeError("Please enter valid deadline").required("Deadline is required"),
    full_name: yup.string().typeError("Please enter full name").required("Full name is required"),
    city: yup.string().typeError("Please enter valid city").required("City is required"),
    district: yup.string().typeError("Please enter valid district").required("District is required"),
    address: yup.string().typeError("Please enter valid address").required("Address is required"),
    pin_code: yup.number().typeError("Please enter valid pin code").required("Pincode is required"),
    state: yup.string().typeError("Please enter valid state").required("State is required"),
    status: yup.string().typeError("Please enter valid Status").required("Status is required"),
})


let addFundRasierInitialValue = {
    amount: '',
    category: "",
    sub_category: "",
    phone_number: "",
    email: "",
    age: "",
    about: "",
    description: "",
    deadline: "",
    full_name: "",
    city: "",
    district: "",
    address: "",
    pin_code: "",
    state: "",
    status: "",
}

export { addFundRaiserValidation, addFundRasierInitialValue }