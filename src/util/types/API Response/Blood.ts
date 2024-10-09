import { BloodCloseCategory, BloodDonorStatus, BloodGroup, BloodGroupUpdateStatus, BloodStatus, Relationship } from "../Enums/BasicEnums"

interface Sample {
    name: string
}

interface IBloodGroupUpdateTemplate {
    _id: string,
    donor_id: string,
    date: Date,
    new_group: BloodGroup,
    certificate: string,
    status: BloodGroupUpdateStatus,
    donor: IBloodDonor
}

interface ILocatedAt {
    coordinates: [string, string]
    hospital_name: string,
    hospital_id: string
}

interface IBloodReq {
    email: string
    blood_id: string
    patientName: string
    unit: number,
    neededAt: Date,
    status: BloodStatus,
    user_id: string,
    profile_id: string,
    blood_group: BloodGroup,
    relationship: Relationship,
    locatedAt: ILocatedAt
    address: string,
    phoneNumber: number
    is_closed: boolean,
    intrest_submission?: []
    close_details?: {
        category: BloodCloseCategory,
        explanation: string
    }
}

interface LocatedAt {
    type: "Point",
    coordinates: [number, number]
}

interface IBloodDonor {
    _id: string
    donor_id: string
    full_name: string
    blood_group: BloodGroup
    location_coords: LocatedAt
    location: ILocatedAt
    phoneNumber: number
    email_address: string
    status: BloodDonorStatus
    blocked_reason: string
    __v: number
}

interface INearestDonor {
    _id: string
    donor_id: string
    full_name: string
    blood_group: BloodGroup
    location_coords: LocatedAt
    location: ILocatedAt
    phoneNumber: number
    email_address: string
    status: BloodDonorStatus
    distance: string
}

interface BloodProfile {
    profile: IBloodDonor
    blood_group: string
    donated_blood: number
    blood_requirements: number
    expressed_intrest: number
    status: string
    matched_profile: number
}

export default IBloodReq
export type { IBloodDonor, Sample, ILocatedAt, BloodProfile, INearestDonor, IBloodGroupUpdateTemplate }