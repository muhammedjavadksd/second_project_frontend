

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
    address: "",
    phone_number:""
}


export { bloodDonatationFormValues, updateBloodGroupInitialValues, updateBloodDonorPersonalDetailsValues }