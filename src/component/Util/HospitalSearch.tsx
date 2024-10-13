import React, { Ref, useEffect, useRef, useState } from 'react';
import { GoogleMap, useLoadScript, Autocomplete } from '@react-google-maps/api';
import { HospitalResponse } from '@/util/types/InterFace/UtilInterface';

const HospitalSearch = ({ selectedHospital, searchRef, defaultValue }: { selectedHospital: Function, searchRef?: Ref<HTMLInputElement>, defaultValue?: string }) => {

    const [defaultVal, setDefault] = useState(defaultValue);

    useEffect(() => {
        if (defaultValue) {
            setDefault(defaultValue);
        }
    }, [defaultValue]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "",
        libraries: ['places']
    });

    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
        setAutocomplete(autocompleteInstance);
    };

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            console.log(place);

            if (place.place_id && place.geometry && place.name) {
                const response: HospitalResponse = {
                    hospital_id: place.place_id,
                    coordinates: [place.geometry.location.toJSON().lng, place.geometry.location.toJSON().lat],
                    hospital_name: place.name
                };
                setDefault(place.name);
                selectedHospital(response);
            }
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDefault(value);
        if (value === '') {
            selectedHospital(null);
        }
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <input
                    value={defaultVal}
                    ref={searchRef}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Search for a hospital..."
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                />
            </Autocomplete>
        </div>
    );
};

export default React.memo(HospitalSearch);
