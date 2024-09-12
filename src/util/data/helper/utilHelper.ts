import const_data from "../const"

export function objectToUrlQuery(object) {
    let query = new URLSearchParams(object)
    return query.toString()
}

export function getCurrentPosition(successCB: Function, errorDB: Function): void {
    navigator.geolocation.getCurrentPosition((location) => {
        successCB(location)
    }, (err) => {
        errorDB(err)
    })
}

export function formatDateToMonthNameAndDate(date) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const d = new Date(date);
    const monthName = months[d.getMonth()];
    const day = d.getDate();
    return `${monthName} ${day}`;
}


export function getMainCategory(): string[] {
    return Object.keys(const_data.FUNDRAISER_CATEGORY)
}

export function getSubCategory(parentCategory): string[] {
    return const_data.FUNDRAISER_CATEGORY[parentCategory] ?? []
}

export function isUrgentFundRaiser(deadLine: Date) {
    const todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + 10);
    if (deadLine < todayDate) {
        return true
    } else {
        return false
    }
}