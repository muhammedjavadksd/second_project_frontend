

const bloodDonatationFormValues = {
    full_name: '',
    phone_number: '',
    email_address: '',
    location: '',
    blood_group: '',
}

const updateBloodGroupInitialValues = {
    blood_group: null,
    certificate: null
}


function updateBloodDonorPersonalDetailsValues(profile) {

    const initData = {
        full_name: profile.full_name,
        phone_number: profile.phoneNumber,
        email_address: profile.email_address,
        location: profile.location,
    }
    return initData
}

const bloodRequestPersonalDetailsInitialValue = {
    patient_name: "",
    relation: "",
    age: '',
    gender: "",
    address: "",
    phone_number: ""
}

const bloodRequestDetailsInitialVaues = {
    blood_group: '',
    unit: '',
    needed_date: '',
    hospital_name: '',
    enquired_with_others: '',
    hospital_id: '',
    personal_details: {}
}


const newTicketRaiseInitialValues = {
    title: "",
    description: "",
    priority: "",
    category: "",
    attachment: "",
}

const bloodDonationFormInitialValues = {
    donatedLast90Days: '',
    weight: '',
    seriousConditions: [],
    majorSurgeryOrIllness: '',
    surgeryOrIllnessDetails: '', // Field for conditional rendering
    chronicIllnesses: '',
    tattooPiercingAcupuncture: '',
    alcoholConsumption: '',
    tobaccoUse: '',
    pregnancyStatus: '',
    date: new Date()
}

const fundRaiserBankAccoutInitialValues = {
    account_number: '',
    re_account_number: "",
    ifsc_code: '',
    holder_name: "",
    account_type: "",
    currentApplication: null,
}


const fundRaisePaymentInitialValues = {
    full_name: "",
    phone_number: "",
    email_id: "",
    hide_profile: false
}

const closeBloodRequirementInitialValues = {
    category: "",
    explanation: ""
}

export { closeBloodRequirementInitialValues, fundRaisePaymentInitialValues, fundRaiserBankAccoutInitialValues, bloodDonationFormInitialValues, newTicketRaiseInitialValues, bloodDonatationFormValues, bloodRequestDetailsInitialVaues, updateBloodGroupInitialValues, updateBloodDonorPersonalDetailsValues, bloodRequestPersonalDetailsInitialValue }