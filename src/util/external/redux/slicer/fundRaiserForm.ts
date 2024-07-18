import { FundRaiserFormInitialValues } from "@/util/types/InterFace/FormInitialValues";

const { createSlice } = require("@reduxjs/toolkit");

const FUND_RAISER_FORM_INITIAL_VALUES: FundRaiserFormInitialValues = {
    amount: null,
    category: null,
    sub_category: null,
    phone_number: null,
    email_id: null,
    pictures: [],
    documents: [],
    raiser_name: null,
    raiser_age: null,
    benificiary_relation: null,
    description: null,
    city: null,
    pinCode: null,
    state: null,
    district: null,
    fullAddress: null,
    ai_description: null,
}

let fundRaiserSlicer = createSlice({
    name: "fund_raising_form",
    initialState: FUND_RAISER_FORM_INITIAL_VALUES,
    reducers: {
        updateFundRaiseData: (state, action): FundRaiserFormInitialValues => {
            let payloadData: FundRaiserFormInitialValues = action.payload.data;
            return { ...state, ...payloadData };
        },
        SetPicturs: (state, action): FundRaiserFormInitialValues => {
            let pictures: string[] = action.payload.pictures ?? [];
            let newPictures: string[] = [...state.pictures, ...pictures];
            return { ...state, pictures: newPictures }
        },
        setDocuments: (state, action): FundRaiserFormInitialValues => {
            let documents = action.payload.documents ?? [];
            let newDocuments = [...state.documents, ...documents];
            return { ...state, documents: newDocuments }
        },
        resetPictures: (state, action): FundRaiserFormInitialValues => {
            let pictures: string[] = action.payload.pictures ?? [];
            let newPictures: string[] = [...pictures];
            return { ...state, pictures: newPictures }
        },
        resetDocuments: (state, action): FundRaiserFormInitialValues => {
            let documents = action.payload.documents ?? [];
            let newDocuments = [...documents];
            return { ...state, documents: newDocuments }
        },
        clearFundRaiserData: (state, action) => {
            return FUND_RAISER_FORM_INITIAL_VALUES;
        }
    }
})

export const { updateFundRaiseData, SetPicturs, setDocuments,resetPictures, resetDocuments, clearFundRaiserData } = fundRaiserSlicer.actions
export default fundRaiserSlicer.reducer