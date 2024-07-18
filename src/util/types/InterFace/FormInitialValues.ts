

interface AdminSignIn {
    email: string,
    password: string
}

interface AdminResetPassword {
    password: string,
    confirm_password: string
    token: string
}


interface AdminForgetPassword {
    email_address: string
}

interface OrganizationInitialValues {
    name: string
    phone_number: number
    email_address: string
    password: string
    blood_service: string
    fund_service: string
    organization_type: string
    website_url: string
    logo_photo: string
    office_photo: string
    registration_photo: string
    pan_card: string
}


interface FundRaiserFormInitialValues {
    amount: string,
    category: string,
    sub_category: string,
    phone_number: number,
    email_id: string,
    pictures: string[],
    documents: string[],
    raiser_name: string,
    raiser_age: number,
    benificiary_relation: string,
    description: string,
    city: string,
    pinCode: number,
    state: string,
    district: string,
    fullAddress: string,
    ai_description: string,
}

interface IOrganizationSignIn {
    email_address: "",
    password: ""
}

interface IOrganizationForgetPasswordInitialValues {
    email_address: string
}

interface IOrganizationResetPassword {
    password: string,
    confirm_password: string
    token: string
}


export type { IOrganizationResetPassword, IOrganizationForgetPasswordInitialValues, IOrganizationSignIn, AdminSignIn, AdminResetPassword, AdminForgetPassword, OrganizationInitialValues, FundRaiserFormInitialValues }