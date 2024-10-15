import { FundRaiserFormInitialValues } from "./FormInitialValues";
import IBloodReq, { ILocatedAt } from "../API Response/Blood";
import { BloodGroup, BloodStatus, Relationship } from "../Enums/BasicEnums";
import { ChatHistory } from "../API Response/Profile";


interface HospitalResponse {
    hospital_id: string,
    coordinates: [number, number],
    hospital_name: string
}

interface FormActionResponse {
    status: boolean,
    msg: string,
    data?: any
}

interface IOptionLabel {
    label: string,
    value: string
}


interface IReduxStore {
    fund_raiser: any
}

interface IUser {
    id: string;
    token: string;
    email: string;
    role: string;
}

interface IAdminSessionData extends IUser {
    name: string
}

interface IOrganizationSessionData extends IUser {
    name: string
}

interface IUserSessionData extends IUser {
    first_name?: string,
    last_name?: string,
    phone: number,
    blood_donor_id?: string,
    blood_token?: string,
    profile_id: string,
}

interface IOnGoingBloodRequest {
    patient_name: "",
    relation: "",
    age: '',
    gender: "",
    address: "",
    phone_number: "",
}

interface IBloodDonate {
    _id: string,
    donor_id: string,
    donation_id: string
    date: Date,
    status: BloodDonationStatus,
    meet_expect: Date,
    concerns: BloodDonationConcerns
    donor_profile: IBloodDonorTemplate
    requirement: IBloodReq
    unit: number
    certificate: string
}

interface IBloodDonorForm {
    donor_id: string
    setDonor: Function
}

interface IChatHistoryContext {
    chatLog: ChatHistory[],
    setChatHistory: Function
}

interface IOnGoingBloodRequestProvider {
    bloodRequestFirstPhase: IOnGoingBloodRequest,
    setFirstPhase: Function
}

interface IOnGoingApplocation {
    currentApplication: string,
    setApplication: Function
}

interface IStore {
    fund_raiser: FundRaiserFormInitialValues
}

interface SelectedHospital {
    place_id: number,
    location: {
        lat: string,
        lon: string,
    }
    type: string,
    name: string,
    display_name: string
}

interface MapApiResponse {
    place_id: number,
    licence: string,
    lat: string,
    lon: string,
    class: string,
    type: string,
    name: string,
    display_name: string
}


interface IIntrestConcerns {
    seriousConditions: string[]
    majorSurgeryOrIllness: string,
    chronicIllnesses: boolean,
    tobaco_use: boolean,
}

interface IShowedIntrest {
    _id: string
    full_name: string
    phoneNumber: string
    donor_id: string,
    donation_id: string,
    date: Date,
    meet_expect: Date,
    status: string,
    concerns: IIntrestConcerns,
    requirement: IBloodReq,
    message_count: number
}

interface IMessageTemplate {
    from: string
    timeline: string
    msg: string
    seen: boolean
}



interface IBloodDonorTemplate {
    donor_id: string
    full_name: string
    blood_group: BloodGroup,
    locatedAt: string,
    phoneNumber: number,
    email_address: string,
    status: BloodDonationStatus,
    blocked_date?: Date
}

interface IBloodRequirementTemplate {
    blood_id: string
    patientName: string
    unit: number,
    neededAt: Date,
    status: BloodStatus,
    user_id: string,
    profile_id: string,
    blood_group: BloodGroup,
    relationship: Relationship,
    locatedAt: ILocatedAt,
    address: String,
    phoneNumber: number
    is_closed: boolean
}


enum BloodDonationStatus {
    Approved = "Approved",
    Rejected = "Rejected",
    Pending = "Pending"
}

interface BloodDonationConcerns {
    seriousConditions: string[]
    majorSurgeryOrIllness: string | null,
    chronicIllnesses: boolean
    tobaco_use: boolean
}

interface IBloodDonateTemplate {
    donor_id: string,
    donation_id: string
    date: Date,
    status: BloodDonationStatus,
    meet_expect: Date,
    concerns: BloodDonationConcerns
}

interface IChatPerson {
    first_name: string,
    last_name: string,
    profile_id: string,
    blood_donor_id: string,
}


interface IChatMessageDetails {
    last_message: string,
    last_message_from: string
    unseen_message_count: number
}

interface IChatRoomResponse {
    chat_id: string,
    chat_started: string,
    blocked: { status: boolean },
    chat_profile_id: string,
    chat_person: IChatPerson,
    messages: IChatMessageDetails
}





interface ChatApiResponse {
    donor_id: string;
    requirement_id: string;
    intrest_id: string;
    from_profile_id: string;
    to_profile_id: string;
    chat_started: Date;
    chats: IMessageTemplate[]; // Replace with a specific type if known
    donor: IBloodDonorTemplate;
    blood_requirements: IBloodRequirementTemplate;
    blood_intrest: IBloodDonateTemplate;
}

interface ICurrentUser {
    name: string
}

interface PaginatedApi {
    renderType(page: number, limit: number, ...args: any[]);
}

interface IPaginatedResponse<T> {
    paginated: []
    total_records: number
}

interface IAdminAddFundRaiser {
    raiser_name: string;               // Name of the fundraiser
    raiser_age: number | null;         // Age of the fundraiser (nullable)
    deadline: Date | null;             // Deadline for the fundraiser (nullable)
    benificiary_relation: string;      // Relation to the beneficiary
    amount: number | null;             // Amount to be raised (nullable)
    category: string;                  // Category of the fundraiser
    sub_category: string;               // Sub-category of the fundraiser
    phone_number: string | null;       // Phone number (nullable)
    email_id: string;                  // Email address
    city: string;                      // City of the fundraiser
    pinCode: string | null;            // Pincode (nullable)
    state: string;                     // State of the fundraiser
    district: string;                  // District of the fundraiser
    fullAddress: string;               // Full address of the fundraiser
    about: string;                     // Information about the fundraiser
    description: string;               // Detailed description of the fundraiser
}

export type { IBloodDonate, IPaginatedResponse, PaginatedApi, IChatRoomResponse, IChatPerson, ICurrentUser, IMessageTemplate, ChatApiResponse, IShowedIntrest, IReduxStore, FormActionResponse, IUserSessionData, IAdminSessionData, IOrganizationSessionData, IOnGoingApplocation, IStore, IBloodDonorForm, MapApiResponse, SelectedHospital, IOnGoingBloodRequest, IOnGoingBloodRequestProvider, IAdminAddFundRaiser, IOptionLabel, HospitalResponse, IChatMessageDetails, IChatHistoryContext }