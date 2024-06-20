import { fund_raise_category } from "./const"


export function getCurrentPosition(successCB, errorDB) {
    navigator.geolocation.getCurrentPosition((location) => {
        successCB(location)
    }, (err) => {
        errorDB(err)
    })
}

export function getMainCategory() {
    return Object.keys(fund_raise_category)
}

export function getSubCategory(parentCategory) {
    return fund_raise_category[parentCategory] ?? []
}