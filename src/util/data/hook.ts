


export function useGetLocation(state) {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            state([coords.longitude, coords.latitude])
        }, (err) => {
            console.log(err);
        })
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
}