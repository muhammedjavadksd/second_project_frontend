const { createSlice } = require("@reduxjs/toolkit");


let fundRaiserSlicer = createSlice({
    name: "fund_raising_form",
    initialState: {
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
    },
    reducers: {
        updateFundRaiseData: (state, action) => {
            let payloadData = action.payload.data;
            console.log("Payload data");
            console.log(payloadData);
            return { ...state, ...payloadData };
        },
        insertPicturs: (state, action) => {
            console.log("This works");
            let pictures = action.payload.pictures ?? [];
            let newPictures = [...state.pictures, ...pictures];
            return { ...state, pictures: newPictures }
        },
        insertDocuments: (state, action) => {
            console.log("Inserting document type");
            let documents = action.payload.documents ?? [];
            let newDocuments = [...state.documents, ...documents];
            return { ...state, documents: newDocuments }
        }
    }
})

export const { updateFundRaiseData, insertPicturs, insertDocuments } = fundRaiserSlicer.actions
export default fundRaiserSlicer.reducer