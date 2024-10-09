"use client"


export function useGetLocation(state) {

    if (typeof window !== 'undefined') {

        try {
            global.navigator.geolocation.getCurrentPosition(({ coords }) => {
                state([coords.longitude, coords.latitude])
            }, (err) => {
                console.log(err);
            })
            return global.navigator
        } catch (e) {
            console.log('Geolocation is not supported by this browser.');
        }
    }

    return null


}