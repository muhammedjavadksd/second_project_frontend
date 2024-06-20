const { combineReducers, configureStore } = require("@reduxjs/toolkit");
const { default: fundRaiserSlicer } = require("../slicer/fundRaiserForm");



let store = configureStore({
    reducer: {
        fund_raiser: fundRaiserSlicer
    }
})


export default store