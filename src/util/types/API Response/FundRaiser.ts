

import { BankAccountType, FundRaiserStatus } from "../Enums/BasicEnums"


interface IDonationStatitics {
    date: string,
    amount: number
}

interface IBankAccount {
    account_number: number,
    ifsc_code: string,
    holder_name: string,
    account_type: BankAccountType,
    befId: string,
    is_active: string,
}

interface ISingleCommentsResponse {
    comment: string,
    comment_id: string,
    date: Date,
    is_edited: boolean,
    user_name: string,
    user_id: string,
    mention: null | string,
    fund_id: string,
    replay_id: string,
    replay: ISingleCommentsResponse[]
}

interface ICommentsResponse {
    paginated: ISingleCommentsResponse[],
    total_records: number
}


interface FundRaiserResponse {
    _id: string,
    creater_profile?: any
    fund_id: string,
    collected: number,
    amount: number,
    category: string,
    sub_category: string,
    phone_number: number,
    email_id: string,
    created_date: Date,
    created_by: string,
    user_id: string,
    picture: string[],
    documents: string[],
    closed: boolean,
    status: FundRaiserStatus,
    about: string,
    age: number,
    benificiary_relation: string,
    full_name: string,
    city: string,
    district: string,
    full_address: string,
    pincode: number,
    state: string,
    deadline: Date
    description: string,
    withdraw_docs: WithdrawDocs,
    bank_account: IBankAccount
}


interface IDonateHistoryTemplate {
    fund_id: String,
    profile_id: String,
    amount: number,
    date: Date
    donation_id: string,
    name: string,
    receipt: string,
    fund_profile: FundRaiserResponse
}

interface AxiosResponse {
    status: boolean,
    msg: string,
    data?: any
}




export interface PaymentOrderResponse {
    _id: string
    is_settled: boolean
    donation_id: string
    order_id: string
    amount: number
    date: string
    profile_id: string
    receipt: string
    fund_id: string
    hide_profile: boolean
    name: string
    __v: number
    profile: Profile
    status: boolean
}

export interface Profile {
    _id: string
    fund_id: string
    amount: number
    collected: number
    category: string
    sub_category: string
    phone_number: number
    email_id: string
    created_date: string
    created_by: string
    user_id: string
    picture: string[]
    documents: string[]
    closed: boolean
    status: string
    __v: number
    about: string
    age: number
    benificiary_relation: string
    deadline: string
    full_name: string
    city: string
    district: string
    full_address: string
    pincode: number
    state: string
    benf_id: string
    withdraw_docs: WithdrawDocs
    description: string
}

export interface WithdrawDocs {
    benf_id: string
}


export interface IFundRaiseStatitics {
    fund_raiser: {
        total_fund_raiser: number,
        activeFundRaise: 0,
        closedFundRaise: 0,
        pendingFundRaiser: 0
    },
    donation: {
        total_donation: 6000
    }
}

export interface IBloodStatitics {
    blood_requirement: {
        totalRequests: number,
        openRequests: number,
        closedRequests: number,
        totalUnitsNeeded: number,
        requestsByBloodGroup: {
            "_id": string,
            "count": number
        }[],
        requestsByStatus: {
            _id: string,
            count: number
        }[],
    },
    blood_donor: {
        totalDonors: number,
        openDonors: number,
        closedDonors: number,
        donorsByBloodGroup: {
            "_id": string,
            "count": number
        }[]
    }
}


export type { IDonateHistoryTemplate, ISingleCommentsResponse, ICommentsResponse, FundRaiserResponse, AxiosResponse, IBankAccount, IDonationStatitics }