"use client";

import AdminLayout from "@/component/Admin/AdminLayout";
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter";
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb";
import HospitalSearch from "@/component/Util/HospitalSearch";
import { HospitalResponse } from "@/util/types/InterFace/UtilInterface";
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import { Fragment, useRef, useState } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";


function Page() {

    const placeRef = useRef();
    const [selectedPlace, setSelectedPlace] = useState(null)

    return (
        <Fragment>
            <AdminPrivateRouter>
                <AdminLayout>
                    <AdminBreadCrumb title={"Find nearest"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Find nearest", href: "/blood/nearest" }]} />
                    <div className="max-w-4xl mx-auto p-4">
                        <div className="relative mb-4">
                            <HospitalSearch searchRef={placeRef} selectedHospital={(hospital: HospitalResponse) => setSelectedPlace(hospital)} />
                        </div>
                        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                            <GoogleMap
                                center={{ lat: 0, lng: 0 }}
                            >

                                <Marker
                                    position={{ lat: 0, lng: 0 }}
                                    icon={{
                                        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                                    }}
                                />

                                <InfoWindow
                                    position={{ lat: 40, lng: 40 }}
                                    onCloseClick={() => { }}
                                >
                                    <div className="p-2">
                                        <h2 className="font-bold text-lg">Javad</h2>
                                        <p>Blood Type: A+</p>
                                        <p>Contact: 9744727684</p>
                                    </div>
                                </InfoWindow>
                            </GoogleMap>
                        </LoadScript>

                    </div>
                </AdminLayout>
            </AdminPrivateRouter>
        </Fragment>
    )
}

export default Page