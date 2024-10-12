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
import { IBloodDonor, INearestDonor } from '@/util/types/API Response/Blood'
import ModelItem from '@/component/Util/ModelItem';
import AskLocation from '@/component/Util/AskLocation';
import ModelHeader from '@/component/Util/Model/ModelHeader';
import BloodDonorCard from '@/component/Blood/DonorCard';
import EmptyScreen from '@/component/Util/EmptyScreen';
import { useGetLocation } from '@/util/data/hook';
import HospitalSearch from '@/component/Util/HospitalSearch';

const BloodDonorSearch = () => {



    const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 });
    const [zoom, setZoom] = useState(8);
    const [selectedDonor, setSelectedDonor] = useState<IBloodDonor>(null);
    const [bloodTypeFilter, setBloodTypeFilter] = useState<BloodGroup>(null);
    const myLocation = useGetLocation();
    const [currentLocation, setLocation] = useState([])
    const [refresh, setRefresh] = useState<boolean>(false);
    const [donors, setDonors] = useState<IBloodDonor[]>([]);

    useEffect(() => {
        setLocation(myLocation)
    }, [myLocation])



    useEffect(() => {
        if (currentLocation) {
            setCenter({ lat: currentLocation[1], lng: currentLocation[0] })
        }
    }, [currentLocation])

    useEffect(() => {
        setRefresh(!refresh)
    }, [bloodTypeFilter, currentLocation])



    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };



    return (
        <>
            <Header />
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
                            <HospitalSearch selectedHospital={(val) => val && setLocation(val['coordinates'])} />
                        </div>
                    </div>
                    <select
                        value={bloodTypeFilter}
                        onChange={(e) => setBloodTypeFilter(e.target.value as BloodGroup)}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value={''}>Select all</option>
                        {
                            Object.values(BloodGroup).map((group: BloodGroup, index: number) => {
                                return (
                                    <option key={index} value={group}>{group}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY} >
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={zoom}
                    >
                        {donors.map((donor) => (
                            <Marker
                                key={1}
                                position={{ lat: donor.location_coords.coordinates[1], lng: donor.location_coords.coordinates[0] }}
                                onClick={() => {

                                    setSelectedDonor(donor)
                                }}
                                icon={{
                                    url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                                }}
                            />
                        ))}
                        {selectedDonor && (
                            <InfoWindow
                                position={{ lat: selectedDonor.location_coords.coordinates[1], lng: selectedDonor.location_coords.coordinates[0] }}
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
                            async renderType(page: number, limit: number) {
                                const donors = await findNearest(bloodTypeFilter, [currentLocation[0], currentLocation[1]], page, limit)
                                setDonors(donors.paginated);
                                return donors
                            },
                        }}
                        itemsRender={(donors: INearestDonor[]) => {
                            return donors && donors.length ? (
                                <div className='grid grid-cols-3 gap-5'>
                                    {
                                        donors.map((each, index) => {
                                            console.log(each);

                                            return (
                                                <BloodDonorCard lati={each.location_coords.coordinates[0]} long={each.location_coords.coordinates[1]} key={index} bloodGroup={each.blood_group} distance={each.distance} email_id={each.email_address} name={each.full_name} />
                                            )
                                        })
                                    }
                                </div>
                            ) : <EmptyScreen msg={"No donor's found"} />
                        }}
                        paginationProps={{ current_page: 1, currentLimit: 10 }}
                        refresh={refresh}
                    >

                    </PaginationSection>

                </div>
            </div>
            <Footer />

        </>
    );
};

export default BloodDonorSearch; 