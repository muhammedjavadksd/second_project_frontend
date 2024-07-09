

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

export type { AdminSignIn, AdminResetPassword, AdminForgetPassword, OrganizationInitialValues }