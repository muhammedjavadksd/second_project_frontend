import { BloodGroup, BloodStatus, Relationship } from "../Enums/BasicEnums"

interface Sample {
    name: string
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
    locatedAt: {
        hospital_name: string,
        hospital_id: string
    },
    address: string,
    phoneNumber: number
    is_closed: boolean
}

export default IBloodReq
export type { Sample }