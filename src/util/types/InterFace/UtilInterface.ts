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
    blood_donor_id?: string
}

interface IBloodDonorForm {
    donor_id: string
    setDonor: Function
}

interface IOnGoingApplocation {
    currentApplication: string,
    setApplication: Function
}

interface IStore {
    fund_raiser: FundRaiserFormInitialValues
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


export type { IReduxStore, FormActionResponse, IUserSessionData, IAdminSessionData, IOrganizationSessionData, IOnGoingApplocation, IStore, IBloodDonorForm }