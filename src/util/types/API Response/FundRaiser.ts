import { FundRaiserStatus } from "../Enums/BasicEnums"



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
    state: string
}


interface AxiosResponse {
    status: boolean,
    msg: string,
    data?: any
}

export type { FundRaiserResponse, AxiosResponse }