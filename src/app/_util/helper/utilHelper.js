export function objectToUrlQuery(object) {
    let query = new URLSearchParams(object)
    return query.toString()
}
