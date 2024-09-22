"use client";

import AdminLayout from "@/component/Admin/AdminLayout";
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter";
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb";
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import { Fragment } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";


function Page() {

    return (
        <Fragment>
            <AdminPrivateRouter>
                <AdminLayout>
                    <AdminBreadCrumb title={"Find nearest"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Find nearest", href: "/blood/nearest" }]} />
                    <div className="max-w-4xl mx-auto p-4">
                        <div className="relative mb-4">
                            <input
                                type="text"
                                onChange={() => { }}
                                placeholder="Enter your location"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                aria-label="Enter your location"
                            />
                            <FaSearch className="absolute right-3 top-3 text-gray-400" />

                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">

                                <li
                                    onClick={() => { }}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    Kerala
                                </li>

                            </ul>
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