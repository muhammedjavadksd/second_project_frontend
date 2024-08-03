import const_data from '@/util/data/const';
import * as yup from 'yup';

let personalDetailsInitialValues = {
    raiser_name: null,
    raiser_age: null,
    benificiary_relation: null,
    description: null,
    currentApplication: null,
    deadline: null
}

const minDeadline = new Date();
minDeadline.setDate(minDeadline.getDate() + 1)

// console.log(FUND_RAISER_FOR);
let personalDetailsValidation = yup.object().shape({
    raiser_name: yup.string().typeError("Please enter valid name").required("Name is required"),
    raiser_age: yup.number()
        .typeError("Please enter a valid age")
        .required("Age is required")
        .positive("Age must be a positive number")
        .integer("Age must be an integer")
        .min(0, "Age must be at least 0")
        .max(120, "Age must be at most 120"),
    benificiary_relation: yup.string().typeError("Please seleoct valid realtion").oneOf(const_data.RELATIONSHIP, "Please select valid fund raiser").required("Relation is required"),
    description: yup.string().typeError("Please enter valid description").test("WordCount", "Please provide minimum 50 words", (val) => val.split(" ").length >= 50).required("Description is required"),
    deadline: yup.date().typeError("Please select valid date").min(minDeadline, "Please select a date that is at least by tomorrow.").required("Deadline is required")
})

export { personalDetailsInitialValues, personalDetailsValidation }