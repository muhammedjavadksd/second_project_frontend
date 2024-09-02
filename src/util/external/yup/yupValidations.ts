
import const_data from '@/util/data/const'
import { BloodGroup } from '@/util/types/Enums/BasicEnums'
import * as yup from 'yup'

const bloodDonatationFormValidation = yup.object().shape({
    full_name: yup.string().typeError("Please enter valid full name").required("Full name is required"),
    phone_number: yup.number().typeError("Please enter valid phone number").required("Phone number is required"),
    email_address: yup.string().email("Please enter valid email address").typeError("Please enter valid email address").required("Email address is required"),
    location: yup.string().optional(),
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
})


const bloodRequestDetailsValidation = yup.object().shape({
    blood_group: yup.string().typeError("Please select valid blood group").oneOf(const_data.BLOOD_GROUPS, "Please select valid blood group").required("Blood group is required"),
    unit: yup.number().typeError("Please select valid unit").required("Unit is required"),
    needed_date: yup.date()
        .typeError("Please select a valid date")
        .min(new Date(), "Please select a date in the future"),
    hospital_name: yup.string().typeError("Please select valid hospital name").required("Please select valid hospital name"),
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
    account_number: yup.number().typeError("Please enter valid account number").required("Account number is required"),
    ifsc_code: yup.string().typeError("Please enter valid IFSC code").required("IFSC code is required"),
    holder_name: yup.string().typeError("Please enter valid holder name").required("Bank holder name is required"),
    account_type: yup.string().typeError("Please select valid account type").required("Account type is required"),
})


const commentPostValidation = yup.object().shape({
    comment: yup.string().required()
})

export { commentPostValidation, fundRaiserBankAccoutValidation, validationSchema, newTicketRaiseValidation, bloodDonatationFormValidation, updateBloodGroupValidation, updateDonorPersonDetailsValidation, bloodRequestPersonalDetailsValidation, bloodRequestDetailsValidation }