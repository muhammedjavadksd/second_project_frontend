"use client"


export function useGetLocation(state) {

    if (typeof window !== 'undefined') {
        if (navigator.geolocation) {
            try {
                navigator.geolocation.getCurrentPosition(({ coords }) => {
                    state([coords.longitude, coords.latitude])
                }, (err) => {
                    console.log(err);
                })
                return navigator
            } catch (e) {
                console.log('Geolocation is not supported by this browser.');
            }
        } else {
            console.log('Geolocation is not supported by this browser.');
        }

    }

    return null


}