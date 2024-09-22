"use client"
import AdminLayout from "@/component/Admin/AdminLayout"
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter"
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb"
import { Fragment } from "react"
import { FaCalendar, FaEnvelope, FaHistory, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa"
import { BiDonateBlood } from "react-icons/bi";
import BloodIntrestCard from "@/component/Blood/AdminBloodIntrestCard"
import MatchedDonors from "@/component/Blood/MatchedDonors"



function Page() {

    return (
        <Fragment>
            <AdminPrivateRouter>
                <AdminLayout>
                    <div className="flex justify-between">
                        <div>
                            <AdminBreadCrumb title={"Blood requirement"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Blood requirement", href: "/blood/blood-reuirement" }]} />
                        </div>
                        <div className='buttonGroups flex items-center justify-end gap-3'>
                            <button className='bg-green-700 text-sm text-white p-2 rounded-lg pl-5 pr-5'> Verify Case </button>
                            <button className='bg-red-700 text-sm text-white p-2 rounded-lg pl-5 pr-5'> Close the case </button>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg mt-4 rounded-lg overflow-hidden mb-8">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Requirement Information</h2>
                            <div className="grid  grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                                    <div className="mt-1 flex items-center">
                                        <BiDonateBlood className="h-5 w-5 text-red-500 mr-2" />
                                        <span className="text-lg font-semibold">A+</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Quantity Required</label>
                                    <span className="text-lg font-semibold">2 units</span>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Location for Donation</label>
                                    <div className="mt-1 flex items-center">
                                        <FaMapMarkerAlt className="h-5 w-5 text-gray-400 mr-2" />
                                        <span>City Hospital, 123 Main St, Anytown, USA</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Contact Information</label>
                                    <div className="mt-1 flex items-center">
                                        <FaPhone className="h-5 w-5 text-gray-400 mr-2" />
                                        <span>+1 (555) 123-4567</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Information</label>
                                    <div className="mt-1 flex items-center">
                                        <FaEnvelope className="h-5 w-5 text-gray-400 mr-2" />
                                        <span>muhammedjavad@gmail.com</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Created by </label>
                                    <div className="mt-1 flex items-center">
                                        <FaUser className="h-5 w-5 text-gray-400 mr-2" />
                                        <span>Mother</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Patient name</label>
                                    <div className="mt-1 flex items-center">
                                        <FaUser className="h-5 w-5 text-gray-400 mr-2" />
                                        <span>Muhammed Javad</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Deadline</label>
                                    <div className="mt-1 flex items-center">
                                        <FaCalendar className="h-5 w-5 text-gray-400 mr-2" />
                                        <span>May 20th 2023</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
                                <p className="mt-1 text-sm text-gray-600">Urgent requirement. Please contact as soon as possible. Donation needed within 24 hours.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className='text-2xl mb-3 '>Showen Intrest</h3>
                        <div className="grid  gap-4 grid-cols-3">
                            <BloodIntrestCard />
                            <BloodIntrestCard />
                            <BloodIntrestCard />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className='text-2xl mb-3 '>Matched Donors</h3>
                        <div className="grid  gap-4 grid-cols-3">
                            <MatchedDonors />
                            <MatchedDonors />
                            <MatchedDonors />
                        </div>
                    </div>
                </AdminLayout>
            </AdminPrivateRouter>
        </Fragment>
    )

}

export default Page