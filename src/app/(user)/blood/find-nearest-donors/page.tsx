"use client"
import Header from '@/component/Header/Header'
import Footer from '@/component/Util/Footer'
import { BloodGroup } from '@/util/types/Enums/BasicEnums'


import React, { useState, useEffect, Fragment } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { FaSearch, FaTint, FaMapMarkerAlt } from 'react-icons/fa';
import SectionTitle from '@/component/Util/SectionTitle'
import { findNearest } from '@/util/data/helper/APIHelper'
import PaginationSection from '@/component/Util/PaginationSection'
import { IPaginatedResponse } from '@/util/types/InterFace/UtilInterface'
import { IBloodDonor } from '@/util/types/API Response/Blood'

const BloodDonorSearch = () => {
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 });
    const [zoom, setZoom] = useState(12);
    const [selectedDonor, setSelectedDonor] = useState<IBloodDonor>(null);
    const [bloodTypeFilter, setBloodTypeFilter] = useState<BloodGroup>(BloodGroup.A_POSITIVE);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [donors, setDonors] = useState<IBloodDonor[]>([]);

    useEffect(() => {
        setRefresh(!refresh)
    }, [bloodTypeFilter, currentLocation])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            setCurrentLocation([coords.longitude, coords.latitude])
        })
    }, [])

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };


    async function handleSearch(page: number, limit: number): Promise<IPaginatedResponse<IBloodDonor[]>> {
        try {
            if (currentLocation && currentLocation.length == 2) {
                const find = await findNearest(bloodTypeFilter, [currentLocation[0], currentLocation[1]], page, limit)
                setDonors(find.paginated)
                console.log("Teh resut");

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

    const filteredDonors = []

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className='-mt-10'>
                    <SectionTitle focus_text='blood donors' sub_title='Nearest blood donors' title='Find nearest '></SectionTitle>
                </div>
                <div className="mb-6 flex flex-wrap items-center justify-center gap-4">

                    <select
                        value={bloodTypeFilter}
                        onChange={(e) => setBloodTypeFilter(e.target.value as BloodGroup)}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        {
                            Object.values(BloodGroup).map((group: BloodGroup) => {
                                return (
                                    <option value={group}>{group}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <LoadScript googleMapsApiKey="AIzaSyDr2_r_ejwoLRx5FB3sMdwSbTdxRUIsY8k">
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={zoom}
                        onLoad={(map) => setMap(map)}
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
                        itemsRender={(donors) => {
                            return donors.length
                        }}
                        paginationProps={{ current_page: 1, currentLimit: 10 }}
                        refresh={!!refresh}
                    >

                    </PaginationSection>
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredDonors.map((donor) => (
                            <div
                                key={donor.id}
                                className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition duration-300 ease-in-out"
                            >
                                <h3 className="text-xl font-semibold mb-2">{donor.name}</h3>
                                <p className="mb-1">
                                    <FaTint className="inline-block mr-2 text-red-600" />
                                    Blood Type: {donor.bloodType}
                                </p>
                                <p className="mb-1">Contact: {donor.contact}</p>
                                <p>Distance: {donor.distance} km</p>
                                <button
                                    onClick={() => {
                                        setSelectedDonor(donor);
                                        map.panTo({ lat: donor.lat, lng: donor.lng });
                                        map.setZoom(15);
                                    }}
                                    className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
                                >
                                    View on Map
                                </button>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
            <Footer />

        </>
    );
};

export default BloodDonorSearch;

// function FindNearestBloodDonors(): React.ReactElement {




//     return (
//         <div>
//             <Header />
//             <div className='container mx-auto'>
//                 <div className="mt-3 mb-3">
//                     <BreadCrumb path={['Blood', 'Find Nearest Donors', 'View']} ></BreadCrumb>
//                 </div>
//                 <div className="bg-white shadow-md gap-5 rounded-lg flex p-x-6">
//                     <div className="w-2/4">
//                         <div className="mt-5">
//                             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4160.221379447023!2d76.31923637523987!3d9.938040274097432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0873e8b17e4e1f%3A0x631726fd9022096b!2sBrototype%20Kochi%20-%20Best%20IT%20training%20institute%20in%20Kochi%2C%20Kerala!5e1!3m2!1sen!2sin!4v1724745776773!5m2!1sen!2sin" width="600" height="450" allowFullScreen={true} loading="lazy" ></iframe>
//                         </div>
//                     </div>
//                     <div className="w-1/2">
//                         <div className=" bg-gray-100 rounded-lg p-4">

//                             <div className="w-full flex justify-center p-1 mb-4">
//                                 <div className="relative w-full">
//                                     <input type="text" className="w-full backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300" placeholder="Search..." />
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//                                         </svg>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="grid grid-cols-1  gap-4">
//                                 <div className="backdrop-blur-sm  bg-white p-4 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-violet-200 hover:border-2 transition-colors duration-300">
//                                     <div className='flex items-center gap-5'>
//                                         <i className="fa-solid text-xl text-red-700 fa-location-dot"></i>
//                                         <div>
//                                             <h2 className="text-sm mb-1 font-semibold">Set Current Location</h2>
//                                             <p className="text-gray-700">Your in Kochi, Maradu Right now</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="backdrop-blur-sm  bg-white p-4 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-violet-200 hover:border-2 transition-colors duration-300">
//                                     <h2 className="text-sm mb-1 font-semibold">Kasaragod General Hospiatl</h2>
//                                     <p className="text-gray-700">Kasaragod general hopsiaal near railway station , pin 671319</p>
//                                 </div>
//                                 <div className="backdrop-blur-sm  bg-white p-4 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-violet-200 hover:border-2 transition-colors duration-300">
//                                     <h2 className="text-sm mb-1 font-semibold">Kasaragod General Hospiatl</h2>
//                                     <p className="text-gray-700">Kasaragod general hopsiaal near railway station , pin 671319</p>
//                                 </div>
//                                 <div className="backdrop-blur-sm  bg-white p-4 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-violet-200 hover:border-2 transition-colors duration-300">
//                                     <h2 className="text-sm mb-1 font-semibold">Kasaragod General Hospiatl</h2>
//                                     <p className="text-gray-700">Kasaragod general hopsiaal near railway station , pin 671319</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     )
// }

// export default FindNearestBloodDonors