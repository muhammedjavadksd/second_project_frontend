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

export default IBloodReq
export type { Sample, ILocatedAt }