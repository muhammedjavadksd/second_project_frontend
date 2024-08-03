import { Reducer, Slice } from "@reduxjs/toolkit";
import { FundRaiserFormInitialValues } from "./FormInitialValues";




interface FormActionResponse {
    status: boolean,
    msg: string,
    data?: any
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
    blood_token?: string
}

interface IOnGoingBloodRequest {
    patient_name: "",
    relation: "",
    age: '',
    gender: "",
    address: "",
    phone_number: "",
}

interface IBloodDonorForm {
    donor_id: string
    setDonor: Function
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


// interface ITokenInterface {
//     token: {
//         user: {
//             role: string,
//         }
//     }
// }

// interface ISession {
//     data?: ITokenInterface
//     token?: ITokenInterface
// }


export type { IReduxStore, FormActionResponse, IUserSessionData, IAdminSessionData, IOrganizationSessionData, IOnGoingApplocation, IStore, IBloodDonorForm, MapApiResponse, SelectedHospital, IOnGoingBloodRequest, IOnGoingBloodRequestProvider }