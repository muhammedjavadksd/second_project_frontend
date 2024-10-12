'use client';
import { useState, useEffect } from 'react';

export function useGetLocation() {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    setLocation([coords.longitude, coords.latitude]);
                },
                (err) => {
                    console.log(err);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }, []);

    return location;
}
