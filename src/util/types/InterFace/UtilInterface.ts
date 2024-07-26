import { Slice } from "@reduxjs/toolkit";
import { FundRaiserFormInitialValues } from "./FormInitialValues";


interface FormActionResponse {
    status: boolean,
    msg: string,
    data?: any
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
    blood_donor_id?: string,
    phone: number,
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


export type { FormActionResponse, IUserSessionData, IAdminSessionData, IOrganizationSessionData, IOnGoingApplocation, IStore, IBloodDonorForm }