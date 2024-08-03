

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
    hospital_id: ''
}


export { bloodDonatationFormValues, bloodRequestDetailsInitialVaues, updateBloodGroupInitialValues, updateBloodDonorPersonalDetailsValues, bloodRequestPersonalDetailsInitialValue }