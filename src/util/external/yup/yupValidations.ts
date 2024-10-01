
import const_data from '@/util/data/const'
import { BloodCloseCategory, BloodGroup } from '@/util/types/Enums/BasicEnums'
import * as yup from 'yup'

const bloodDonatationFormValidation = yup.object().shape({
    full_name: yup.string().typeError("Please enter valid full name").required("Full name is required"),
    phone_number: yup.number().typeError("Please enter valid phone number").required("Phone number is required"),
    email_address: yup.string().email("Please enter valid email address").typeError("Please enter valid email address").required("Email address is required"),
    // location: yup.string().optional(),
    blood_group: yup.string().typeError("Please select valid blood group").oneOf(Object.values(BloodGroup), "Please select valid blood group").required("Blood group is required")
})

const updateDonorPersonDetailsValidation = yup.object().shape({
    full_name: yup.string().typeError("Please enter valid full name").required("Full name is required"),
    phone_number: yup.number().typeError("Please enter valid phone number").required("Phone number is required"),
    email_address: yup.string().email("Please enter valid email address").typeError("Please enter valid email address").required("Email address is required"),
    location: yup.string().optional(),
})

const updateBloodGroupValidation = yup.object().shape({
    blood_group: yup.string().typeError("Please select valid blood group").oneOf(Object.values(BloodGroup), "Please select valid blood group").required("Blood group is required"),
    certificate: yup.mixed().required("Please upload certificate")
})

const bloodRequestPersonalDetailsValidation = yup.object().shape({
    patient_name: yup.string().typeError("Please enter valid name").required("Patient name is required"),
    gender: yup.string().typeError("Please enter valid gender").required("Gender is required"),
    age: yup.number().typeError("Please enter valid age").required("Age is required"),
    relation: yup.string().typeError("Please select valid relation").required("Relation with patient is required"),
    address: yup.string().typeError("Please enter valid address").required("Please enter valid address"),
    phone_number: yup.number().typeError("Please enter valid phone number").required("Phone number is required"),
    email_address: yup.string().email().typeError("Please enter valid email address").required("email address is required"),
})


const bloodRequestDetailsValidation = yup.object().shape({
    blood_group: yup.string().typeError("Please select valid blood group").oneOf(const_data.BLOOD_GROUPS, "Please select valid blood group").required("Blood group is required"),
    unit: yup.number().typeError("Please select valid unit").required("Unit is required"),
    needed_date: yup.date()
        .typeError("Please select a valid date")
        .min(new Date(), "Please select a date in the future"),
    // hospital_name: yup.string().typeError("Please select valid hospital name").required("Please select valid hospital name"),
    enquired_with_others: yup.string().typeError("Please select enquired details").required("Please select enquired details")
})

const newTicketRaiseValidation = yup.object().shape({
    title: yup.string().typeError("Please enter valid title").required("Title is required"),
    description: yup.string().typeError("Please enter valid description").required("description is required"),
    priority: yup.string().typeError("Please enter valid priority").required("Priority is required"),
    category: yup.string().typeError("Please enter valid category").required("Categorys is required"),
    attachment: yup.string().typeError("Please select valid file").nullable(),
})

const validationSchema = yup.object().shape({
    donatedLast90Days: yup.string()
        .required('Please select whether you have donated blood in the last 90 days'),
    weight: yup.number()
        .required('Please enter your weight')
        .min(1, 'Weight must be a positive number')
        .test(
            'is-valid-weight',
            'Weight must be above 50kg',
            value => value > 49
        ),
    seriousConditions: yup.array()
        .required('Please select if you have any serious conditions'),
    majorSurgeryOrIllness: yup.string()
        .required('Please select if you have had any major surgery or illness'),
    surgeryOrIllnessDetails: yup.string()
        .test('surgeryOrIllnessDetails', 'Please provide details of the surgery or illness', function (value) {
            const { majorSurgeryOrIllness } = this.parent;
            if (majorSurgeryOrIllness === 'Yes' && !value) {
                return false; // Validation fails
            }
            return true; // Validation passes
        }),
    chronicIllnesses: yup.string()
        .required('Please select if you have any chronic illnesses'),
    tattooPiercingAcupuncture: yup.string()
        .required('Please select if you had any tattoo, piercing, or acupuncture'),
    alcoholConsumption: yup.string()
        .required('Please select if you have consumed alcohol in the past 48 hours'),
    tobaccoUse: yup.string()
        .required('Please select if you use tobacco products'),
    pregnancyStatus: yup.string()
        .required('Please select your pregnancy status'),
    date: yup.string().typeError("Please select a date for donation").required("Meetup time is required")
});


const fundRaiserBankAccoutValidation = yup.object().shape({
    account_number: yup.string().matches(/^\d{10,20}$/, "Bank account number must be between 10 and 20 digits").required("Bank account number is required"),
    re_account_number: yup.string().oneOf([yup.ref('account_number')], "Account Numbers must match").required("Bank account number is required"),
    ifsc_code: yup.string().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter valid IFSC code").typeError("Please enter valid IFSC code").required("IFSC code is required"),
    holder_name: yup.string().typeError("Please enter valid holder name").required("Bank holder name is required"),
    account_type: yup.string().typeError("Please select valid account type").required("Account type is required"),
})


const commentPostValidation = yup.object().shape({
    comment: yup.string().required()
})

const fundRaisePaymentValidation = yup.object().shape({
    full_name: yup.string().typeError("Please enter valid name").required("Full name is required"),
    phone_number: yup.number().typeError("Please enter valid phone number").required("Phone number is required"),
    email_id: yup.string().email().typeError("Please enter valid email id").required("email id is required"),
    hide_profile: yup.bool().typeError("Please enter valid profile status").required("Do you want to hide your profile?")
})

const closeBloodRequirementValidation = yup.object().shape({
    category: yup.string().typeError("Please select valid category").oneOf(Object.values(BloodCloseCategory), "Please select valid category").required("Please select valid category"),
    explanation: yup.string().typeError("Please enter valid explanation").required("Please enter valid explanation")
})

const bloodApproveValidation = yup.object().shape({
    unit: yup.number().typeError("Please provide valid unit in count").required("Please enter valid unit"),
})

const adminAddFundRaiseValidation = yup.object().shape({
    raiser_name: yup.string().required('Please enter the raiser name.'),
    raiser_age: yup.number().required('Please enter the raiser age.').positive('Age must be a positive number.').typeError('Raiser age must be a number.'),
    deadline: yup.date().required('Please select a deadline.').typeError('Deadline must be a valid date.'),
    benificiary_relation: yup.string().required('Please specify the beneficiary relation.'),
    amount: yup.number().required('Please enter the amount.').positive('Amount must be a positive number.').min(2000, "Amount must be minimum 2000-/").typeError('Amount must be a number.'),
    category: yup.string().required('Please select a category.'),
    sub_category: yup.string().required('Please select a sub-category.'),
    phone_number: yup.string().required('Please enter the phone number.').matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits.'),
    email_id: yup.string().email('Please enter a valid email address.').required('Please enter the email.'),
    city: yup.string().required('Please enter the city.'),
    pinCode: yup.string().required('Please enter the pincode.').matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits.'),
    state: yup.string().required('Please enter the state.'),
    district: yup.string().required('Please enter the district.'),
    fullAddress: yup.string().required('Please enter the full address.'),
    about: yup.string().required('Please provide information about the fundraiser.'),
    description: yup.string().required('Please enter a description for the fundraiser.'),
})

const editFundRaiseAboutValidation = yup.object().shape({
    about: yup.string().typeError("Please enter valid description").test("WordCount", "Please provide minimum 50 words", (val) => val.split(" ").length >= 50).required("Description is required"),
})

const editFundRaiseDescriptionValidation = yup.object().shape({
    description: yup.string().typeError("Please enter valid description").test("WordCount", "Please provide minimum 50 words", (val) => val.split(" ").length >= 50).required("Description is required"),
})

const requestPersonalBlood = yup.object().shape({
    unit: yup.number()
        .required('Unit is required')
        .positive('Unit must be a positive number')
        .integer('Unit must be an integer'),
    deadline: yup.date()
        .required('Deadline is required')
        .min(new Date(), 'Deadline cannot be in the past'),
    hospital: yup.string()
        .required('Hospital name is required')
        .min(2, 'Hospital name must be at least 2 characters')
});

export { editFundRaiseDescriptionValidation, editFundRaiseAboutValidation, closeBloodRequirementValidation, commentPostValidation, fundRaisePaymentValidation, fundRaiserBankAccoutValidation, validationSchema, newTicketRaiseValidation, bloodDonatationFormValidation, updateBloodGroupValidation, updateDonorPersonDetailsValidation, bloodRequestPersonalDetailsValidation, bloodRequestDetailsValidation, bloodApproveValidation, adminAddFundRaiseValidation, requestPersonalBlood }