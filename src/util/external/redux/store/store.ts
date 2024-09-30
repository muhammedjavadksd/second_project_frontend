// const { combineReducers, configureStore } = require("@reduxjs/toolkit");

import { configureStore } from "@reduxjs/toolkit"
import fundRaiserSlicer from "../slicer/fundRaiserForm"



let store = configureStore({
    reducer: {
        fund_raiser: fundRaiserSlicer
    }
})


export default store