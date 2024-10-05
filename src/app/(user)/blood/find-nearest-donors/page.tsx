"use client"
import Header from '@/component/Header/Header'
import Footer from '@/component/Util/Footer'
import { BloodGroup } from '@/util/types/Enums/BasicEnums'
import React, { useState, useEffect, Fragment } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { FaSearch, FaTint, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import SectionTitle from '@/component/Util/SectionTitle'
import { findNearest, findPlaces } from '@/util/data/helper/APIHelper'
import PaginationSection from '@/component/Util/PaginationSection'
import { IPaginatedResponse, SelectedHospital } from '@/util/types/InterFace/UtilInterface'
import { IBloodDonor, INearestDonor } from '@/util/types/API Response/Blood'
import { toast } from 'react-toastify';
import ModelItem from '@/component/Util/ModelItem';
import AskLocation from '@/component/Util/AskLocation';
import ModelHeader from '@/component/Util/Model/ModelHeader';
import BloodDonorCard from '@/component/Blood/DonorCard';
import EmptyScreen from '@/component/Util/EmptyScreen';
import { usePlacesWidget } from 'react-google-autocomplete';
import Select from 'react-select'

const BloodDonorSearch = () => {
    const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 });
    const [zoom, setZoom] = useState(8);
    const [selectedDonor, setSelectedDonor] = useState<IBloodDonor>(null);
    const [bloodTypeFilter, setBloodTypeFilter] = useState<BloodGroup>(BloodGroup.A_POSITIVE);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [donors, setDonors] = useState<IBloodDonor[]>([]);
    const [locationAccess, setLocationAccess] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [location, setLocation] = useState([]);
    const [isSearching, setSearching] = useState<boolean>(false)
    const [selectedLocation, setSelectedLocation] = useState<SelectedHospital>(null);
    const [isLoading, setLoading] = useState(true)


    useEffect(() => {
        if (currentLocation) {
            setCenter({ lat: currentLocation[1], lng: currentLocation[0] })
        }
    }, [currentLocation])



    useEffect(() => {
        setRefresh(!refresh)
    }, [bloodTypeFilter, currentLocation])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            setCurrentLocation([coords.longitude, coords.latitude])
            setLoading(false)
        }, (err) => {
            setLoading(false)
            console.log(err);
        })
    }, [])

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };
    async function findNearestPlace(query) {

        try {
            setSearching(true)
            const find = await findPlaces(query)
            console.log(find);

            if (find) {
                const allLocation = find.map((city) => {

                    const streetName = city?.display_name
                    const streetId = city?.place_id
                    return {
                        value: streetId,
                        label: streetName
                    }
                })
                console.log(allLocation);

                setLocation(allLocation)
            } else {
                setSearching(false)
            }
        } catch (e) {
            console.log(e);
            setSearching(false)
        }
    }



    async function handleSearch(page: number, limit: number): Promise<IPaginatedResponse<IBloodDonor[]>> {
        try {
            if (currentLocation && currentLocation.length == 2) {
                const find = await findNearest(bloodTypeFilter, [currentLocation[0], currentLocation[1]], page, limit)
                setDonors(find.paginated)

                console.log(find);

                return find
            } else {
                return {
                    paginated: [],
                    total_records: 0
                }
            }
        } catch (e) {
            return {
                paginated: [],
                total_records: 0
            }
        }
    };

    // const { ref } = usePlacesWidget({
    //     apiKey: "AIzaSyDr2_r_ejwoLRx5FB3sMdwSbTdxRUIsY8k",
    //     onPlaceSelected: (place) => console.log(place)
    // })

    return (
        <>
            <Header />
            {
            }
            <ModelItem ZIndex={99} closeOnOutSideClock={false} isOpen={!(!!currentLocation)} onClose={() => { }} >
                <div>
                    <ModelHeader title={'Access location'} />
                    <AskLocation />
                </div>
            </ModelItem>
            <div className="container mx-auto px-4 py-8">
                <div className='-mt-10'>
                    <SectionTitle focus_text='blood donors' sub_title='Nearest blood donors' title='Find nearest '></SectionTitle>
                </div>
                <div className="mb-6 flex flex-wrap items-center justify-center gap-4">

                    <div className=" flex justify-center p-1">
                        <div className="relative w-full">
                            {/* <AutoComplete
                                apiKey={YOUR_GOOGLE_MAPS_API_KEY}
                                onPlaceSelected={(place) => console.log(place)}
                            /> */}
                            <input type="text" className="w-full backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300" placeholder="Search location..." />

                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <select
                        value={bloodTypeFilter}
                        onChange={(e) => setBloodTypeFilter(e.target.value as BloodGroup)}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        {
                            Object.values(BloodGroup).map((group: BloodGroup, index: number) => {
                                return (
                                    <option key={index} value={group}>{group}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={zoom}
                    >
                        {donors.map((donor) => (
                            <Marker
                                key={1}
                                position={{ lat: donor.locatedAt.coordinates[1], lng: donor.locatedAt.coordinates[0] }}
                                onClick={() => setSelectedDonor(donor)}
                                icon={{
                                    url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                                }}
                            />
                        ))}
                        {selectedDonor && (
                            <InfoWindow
                                position={{ lat: selectedDonor.locatedAt.coordinates[1], lng: selectedDonor.locatedAt.coordinates[0] }}
                                onCloseClick={() => setSelectedDonor(null)}
                            >
                                <div className="p-2">
                                    <h2 className="text-lg font-semibold mb-2">{selectedDonor.full_name}</h2>
                                    <p className="mb-1">
                                        <FaTint className="inline-block mr-2 text-red-600" />
                                        Blood Group: {selectedDonor.blood_group}
                                    </p>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </LoadScript>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Nearby Donors</h2>
                    <PaginationSection
                        api={{
                            renderType(page: number, limit: number) {
                                return handleSearch(page, limit)
                            },
                        }}
                        itemsRender={(donors: INearestDonor[]) => {
                            return donors && donors.length ? (
                                <div className='grid grid-cols-3 gap-5'>
                                    {
                                        donors.map((each, index) => {
                                            return (
                                                <BloodDonorCard lati={each.locatedAt.coordinates[0]} long={each.locatedAt.coordinates[1]} key={index} bloodGroup={each.blood_group} distance={each.distance} email_id={each.email_address} name={each.full_name} />
                                            )
                                        })
                                    }
                                </div>
                            ) : <EmptyScreen msg={"No donor's found"} />
                        }}
                        paginationProps={{ current_page: 1, currentLimit: 10 }}
                        refresh={!!refresh}
                    >

                    </PaginationSection>

                </div>
            </div>
            <Footer />

        </>
    );
};

export default BloodDonorSearch; 