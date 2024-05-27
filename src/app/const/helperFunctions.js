

export function getCurrentPosition(successCB, errorDB) {
    navigator.geolocation.getCurrentPosition((location) => {
        successCB(location)
    }, (err) => {
        errorDB(err)
    })
}

