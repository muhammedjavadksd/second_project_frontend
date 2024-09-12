import { BloodGroup, BloodStatus, Relationship } from "../Enums/BasicEnums"

interface Sample {
    name: string
}

interface ILocatedAt {
    hospital_name: string,
    hospital_id: string
}

interface IBloodReq {
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
}

interface LocatedAt {
    accuracy: number
    longitude: number
    latitude: number
    _id: string
}

interface Profile2 {
    _id: string
    donor_id: string
    full_name: string
    blood_group: string
    locatedAt: LocatedAt
    phoneNumber: number
    email_address: string
    status: string
    __v: number
}

interface BloodProfile {
    profile: Profile2
    blood_group: string
    donated_blood: number
    blood_requirements: number
    expressed_intrest: number
    status: string
    matched_profile: number
}

export default IBloodReq
export type { Sample, ILocatedAt, BloodProfile }