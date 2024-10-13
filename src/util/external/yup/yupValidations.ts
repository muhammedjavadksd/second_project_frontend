
import const_data from '@/util/data/const'
import { BloodCloseCategory, BloodDonorStatus, BloodGroup } from '@/util/types/Enums/BasicEnums'
import * as yup from 'yup'

let adminSiteSettings = yup.object().shape({
    email: yup.string().trim().email("Please enter valid email address").required("Email address is required").typeError("Please enter valid password"),
})

const bloodDonatationFormValidation = yup.object().shape({
    full_name: yup.string().trim().typeError("Please enter valid full name").required("Full name is required"),
    phone_number: yup.string().trim().typeError("Please enter valid phone number").matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required("Phone number is required"),
    email_address: yup.string().trim().email("Please enter valid email address").typeError("Please enter valid email address").required("Email address is required"),
    // location: yup.string().trim().optional(),
    blood_group: yup.string().trim().typeError("Please select valid blood group").oneOf(Object.values(BloodGroup), "Please select valid blood group").required("Blood group is required")
})

const updateDonorPersonDetailsValidation = yup.object().shape({
    full_name: yup.string().trim().typeError("Please enter valid full name").required("Full name is required"),
    phone_number: yup.number().typeError("Please enter valid phone number").required("Phone number is required"),
    email_address: yup.string().trim().email("Please enter valid email address").typeError("Please enter valid email address").required("Email address is required"),
    location: yup.mixed().optional(),
})

const updateBloodGroupValidation = yup.object().shape({
    blood_group: yup.string().trim().typeError("Please select valid blood group").oneOf(Object.values(BloodGroup), "Please select valid blood group").required("Blood group is required"),
    certificate: yup.mixed().required("Please upload certificate")
})

const bloodRequestPersonalDetailsValidation = yup.object().shape({
    patient_name: yup.string().trim().typeError("Please enter valid name").required("Patient name is required"),
    gender: yup.string().trim().typeError("Please enter valid gender").required("Gender is required"),
    age: yup.number().positive().typeError("Please enter valid age").required("Age is required"),
    relation: yup.string().trim().typeError("Please select valid relation").required("Relation with patient is required"),
    address: yup.string().trim().typeError("Please enter valid address").required("Please enter valid address"),
    phone_number: yup.number().typeError("Please enter valid phone number").required("Phone number is required"),
    email_address: yup.string().trim().email().typeError("Please enter valid email address").required("email address is required"),
})


const bloodRequestDetailsValidation = yup.object().shape({
    blood_group: yup.string().trim().typeError("Please select valid blood group").oneOf(const_data.BLOOD_GROUPS, "Please select valid blood group").required("Blood group is required"),
    unit: yup.number().typeError("Please select valid unit").required("Unit is required"),
    needed_date: yup.date()
        .typeError("Please select a valid date")
        .min(new Date(), "Please select a date in the future"),
    // hospital_name: yup.string().trim().typeError("Please select valid hospital name").required("Please select valid hospital name"),
    enquired_with_others: yup.string().trim().typeError("Please select enquired details").required("Please select enquired details")
})

const newTicketRaiseValidation = yup.object().shape({
    title: yup.string().trim().typeError("Please enter valid title").required("Title is required"),
    description: yup.string().trim().typeError("Please enter valid description").required("description is required"),
    priority: yup.string().trim().typeError("Please enter valid priority").required("Priority is required"),
    category: yup.string().trim().typeError("Please enter valid category").required("Categorys is required"),
    attachment: yup.string().trim().typeError("Please select valid file").nullable(),
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
    date: yup
        .mixed()
        .test("date-time", "Meet date and time must be in the future", function (value: Date) {
            const selectedDateTime = new Date(value);
            const currentDateTime = new Date();
            return selectedDateTime > currentDateTime;
        })
        .typeError("Please select a valid date and time for donation")
        .required("Meetup date and time are required")
});


const fundRaiserBankAccoutValidation = yup.object().shape({
    account_number: yup.string().trim().matches(/^\d{10,20}$/, "Bank account number must be between 10 and 20 digits").required("Bank account number is required"),
    re_account_number: yup.string().trim().oneOf([yup.ref('account_number')], "Account Numbers must match").required("Bank account number is required"),
    ifsc_code: yup.string().trim().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter valid IFSC code").typeError("Please enter valid IFSC code").required("IFSC code is required"),
    holder_name: yup.string().trim().typeError("Please enter valid holder name").required("Bank holder name is required"),
    account_type: yup.string().trim().typeError("Please select valid account type").required("Account type is required"),
})


const commentPostValidation = yup.object().shape({
    comment: yup.string().trim().required()
})

const fundRaisePaymentValidation = yup.object().shape({
    full_name: yup.string().trim().typeError("Please enter valid name").required("Full name is required"),
    phone_number: yup.string().trim().typeError("Please enter valid phone number").matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
    email_id: yup.string().trim().email().typeError("Please enter valid email id").required("email id is required"),
    hide_profile: yup.bool().typeError("Please enter valid profile status").required("Do you want to hide your profile?")
})

const closeBloodRequirementValidation = yup.object().shape({
    category: yup.string().trim().typeError("Please select valid category").oneOf(Object.values(BloodCloseCategory), "Please select valid category").required("Please select valid category"),
    explanation: yup.string().trim().typeError("Please enter valid explanation").required("Please enter valid explanation")
})

const bloodApproveValidation = yup.object().shape({
    unit: yup.number().typeError("Please provide valid unit in count").required("Please enter valid unit"),
})

const adminAddFundRaiseValidation = yup.object().shape({
    raiser_name: yup.string().trim().required('Please enter the raiser name.'),
    raiser_age: yup.number().required('Please enter the raiser age.').positive('Age must be a positive number.').typeError('Raiser age must be a number.'),
    deadline: yup.date().required('Please select a deadline.').typeError('Deadline must be a valid date.').min(new Date(), "Please select future date only"),
    benificiary_relation: yup.string().trim().required('Please specify the beneficiary relation.'),
    amount: yup.number().required('Please enter the amount.').positive('Amount must be a positive number.').min(2000, "Amount must be minimum 2000-/").typeError('Amount must be a number.'),
    category: yup.string().trim().required('Please select a category.'),
    sub_category: yup.string().trim().required('Please select a sub-category.'),
    phone_number: yup.string().trim().required('Please enter the phone number.').matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits.'),
    email_id: yup.string().trim().email('Please enter a valid email address.').required('Please enter the email.'),
    city: yup.string().trim().required('Please enter the city.'),
    pinCode: yup.string().trim().required('Please enter the pincode.').matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits.'),
    state: yup.string().trim().required('Please enter the state.'),
    district: yup.string().trim().required('Please enter the district.'),
    fullAddress: yup.string().trim().required('Please enter the full address.'),
    about: yup.string().trim().required('Please provide information about the fundraiser.'),
    description: yup.string().trim().required('Please enter a description for the fundraiser.'),
})

const editFundRaiseAboutValidation = yup.object().shape({
    about: yup.string().trim().typeError("Please enter valid description").test("WordCount", "Please provide minimum 50 words", (val) => val.split(" ").length >= 50).required("Description is required"),
})

const editFundRaiseDescriptionValidation = yup.object().shape({
    description: yup.string().trim().typeError("Please enter valid description").test("WordCount", "Please provide minimum 50 words", (val) => val.split(" ").length >= 50).required("Description is required"),
})

const requestPersonalBlood = yup.object().shape({
    unit: yup.number()
        .required('Unit is required')
        .positive('Unit must be a positive number')
        .integer('Unit must be an integer'),
    deadline: yup.date()
        .required('Deadline is required')
        .min(new Date(), 'Deadline cannot be in the past'),
    // hospital: yup.string()
    //     .required('Hospital name is required')
    //     .min(2, 'Hospital name must be at least 2 characters')
});

const hospitalSchema = yup.object().shape({
    hospital_id: yup.string().trim().required('Select active hospital'),
    coordinates: yup.array()
        .of(yup.number().required('Select active hospital'))
        .length(2, 'Select active hospital'),
    hospital_name: yup.string().trim().required('Select active hospital'),
});


const bloodRequirementAdminValidation = yup.object().shape({
    email_id: yup.string().trim().email('Invalid email format').required('Email is required'),
    patientName: yup.string().trim().required('Patient name is required'),
    unit: yup.number().positive('Unit must be a positive number').required('Unit is required'),
    status: yup.string().trim().required('Status is required'),
    blood_group: yup.string().trim().required('Blood group is required'),
    hospital: hospitalSchema.required("Select valid hospital"),
    address: yup.string().trim().required('Address is required'),
    phoneNumber: yup.string().trim().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    neededAt: yup.date()
        .required('Date needed is required')
        .min(new Date(), 'Date needed must be in the future')
})

const blockDonroAccountValidation = yup.object().shape({
    reason: yup.string().trim().required("Reason is required").min(5, "Reason should be at least 5 characters long").typeError("Please enter a valid reason"),
})
const addBloodDonorValidation = yup.object().shape({
    full_name: yup.string().trim().required('Full name is required').min(3, 'Full name must be at least 3 characters long'),
    blood_group: yup.string().trim().required('Blood group is required').oneOf(Object.values(BloodGroup), 'Invalid blood group'),
    // location: hospitalSchema.required("Select valid location"),
    phone_number: yup.string().trim().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
    email_address: yup.string().trim().email('Invalid email address').required('Email address is required'),
    status: yup.string().trim().oneOf(Object.values(BloodDonorStatus), 'Invalid status')
})

const resetPasswordValidation = yup.object().shape({
    email_address: yup.string().trim().email("Please enter valid email address").required("Email address is required").typeError("Please enter valid email address")
})


const adminResetPasswordValidation = yup.object().shape({
    password: yup.string().trim().required("Password is required").typeError("Please enter valid password"),
    confirm_password: yup.string().trim().required("Confirm password is required").oneOf([yup.ref("password")], "Password & Confirm password must be same").typeError("Please enter valid password")
})


let adminSignInValidation = yup.object().shape({
    email: yup.string().trim().email("Please enter valid email address").required("Email address is required").typeError("Please enter valid password"),
    password: yup.string().trim().required("Please enter valid password").typeError("Please enter valid password")
})


const editEmailAddressValidation = yup.object().shape({
    email: yup.string().trim().typeError("Please enter valid email address").email("Please enter valid email address").required("Email address is required")
})

const editEmailAddressValidationWithOTP = yup.object().shape({
    email: yup.string().trim().typeError("Please enter valid email address").email("Please enter valid email address").required("Email address is required"),
    otp: yup.string().trim().matches(/^[0-9]{6}$/, 'OTP must be exactly 6 digits').required('OTP is required'),
})


const editPhoneNumberSchema = yup.object().shape({
    phone_number: yup.string().trim().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
});


const editPhoneAndOTPSchema = yup.object().shape({
    phone_number: yup.string().trim().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
    otp: yup.string().trim().matches(/^[0-9]{6}$/, 'OTP must be exactly 6 digits').required('OTP is required'),
});

export const editProfileValidation = yup.object().shape({
    first_name: yup.string().trim().typeError("Please enter valid first name").required("First name is required"),
    last_name: yup.string().trim().typeError("Please enter valid last name").required("Last name is required")
})


export { editPhoneNumberSchema, editPhoneAndOTPSchema }
export { editEmailAddressValidation, editEmailAddressValidationWithOTP }
export { resetPasswordValidation, adminResetPasswordValidation, adminSignInValidation }
export { editFundRaiseDescriptionValidation, editFundRaiseAboutValidation, closeBloodRequirementValidation, commentPostValidation, fundRaisePaymentValidation, fundRaiserBankAccoutValidation, validationSchema, newTicketRaiseValidation, bloodDonatationFormValidation, updateBloodGroupValidation, updateDonorPersonDetailsValidation, bloodRequestPersonalDetailsValidation, bloodRequestDetailsValidation, bloodApproveValidation, adminAddFundRaiseValidation, requestPersonalBlood, adminSiteSettings, bloodRequirementAdminValidation, addBloodDonorValidation, blockDonroAccountValidation }