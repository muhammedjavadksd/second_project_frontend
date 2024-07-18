import const_data from '@/util/data/const';
import * as yup from 'yup';

let personalDetailsInitialValues = {
    raiser_name: null,
    raiser_age: null,
    benificiary_relation: null,
    description: null
}

// console.log(FUND_RAISER_FOR);
let personalDetailsValidation = yup.object().shape({
    raiser_name: yup.string("Please enter valid name").required("Name is required"),
    raiser_age: yup.number()
        .typeError("Please enter a valid age")
        .required("Age is required")
        .positive("Age must be a positive number")
        .integer("Age must be an integer")
        .min(0, "Age must be at least 0")
        .max(120, "Age must be at most 120"),
    benificiary_relation: yup.string("Please seleoct valid realtion").oneOf(const_data.FUND_RAISER_FOR, "Please select valid fund raiser").required("Relation is required"),
    description: yup.string("Please enter valid description").test("WordCount", "Please provide minimum 50 words", (val) => val.split(" ").length >= 50).required("Description is required")
})

export { personalDetailsInitialValues, personalDetailsValidation }