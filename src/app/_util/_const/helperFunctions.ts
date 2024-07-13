import const_data from "./const"


export function getCurrentPosition(successCB: Function, errorDB: Function): void {
    navigator.geolocation.getCurrentPosition((location) => {
        successCB(location)
    }, (err) => {
        errorDB(err)
    })
}

export function getMainCategory(): string[] {
    return Object.keys(const_data.FUNDRAISER_CATEGORY)
}

export function getSubCategory(parentCategory): string[] {
    return const_data.FUNDRAISER_CATEGORY[parentCategory] ?? []
}