"use client"
import BloodRequirementSingleItem from '@/component/Blood/BloodRequirementSingleItem'
import Header from '@/component/Header/Header'
import BreadCrumb from '@/component/Util/BreadCrumb'
import Footer from '@/component/Util/Footer'
import { BloodGroup } from '@/util/types/Enums/BasicEnums'
import React from 'react'


function FindNearestBloodDonors(): React.ReactElement {




    return (
        <div>
            <Header />
            <div className='container mx-auto'>
                <div className="mt-3 mb-3">
                    <BreadCrumb path={['Blood', 'Find Nearest Donors', 'View']} ></BreadCrumb>
                </div>
                <div className="bg-white shadow-md gap-5 rounded-lg flex p-x-6">
                    <div className="w-2/4">
                        <div className="mt-5">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4160.221379447023!2d76.31923637523987!3d9.938040274097432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0873e8b17e4e1f%3A0x631726fd9022096b!2sBrototype%20Kochi%20-%20Best%20IT%20training%20institute%20in%20Kochi%2C%20Kerala!5e1!3m2!1sen!2sin!4v1724745776773!5m2!1sen!2sin" width="600" height="450" allowFullScreen={true} loading="lazy" ></iframe>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className=" bg-gray-100 rounded-lg p-4">

                            <div className="w-full flex justify-center p-1 mb-4">
                                <div className="relative w-full">
                                    <input type="text" className="w-full backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300" placeholder="Search..." />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1  gap-4">
                                <div className="backdrop-blur-sm  bg-white p-4 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-violet-200 hover:border-2 transition-colors duration-300">
                                    <div className='flex items-center gap-5'>
                                        <i className="fa-solid text-xl text-red-700 fa-location-dot"></i>
                                        <div>
                                            <h2 className="text-sm mb-1 font-semibold">Set Current Location</h2>
                                            <p className="text-gray-700">Your in Kochi, Maradu Right now</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="backdrop-blur-sm  bg-white p-4 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-violet-200 hover:border-2 transition-colors duration-300">
                                    <h2 className="text-sm mb-1 font-semibold">Kasaragod General Hospiatl</h2>
                                    <p className="text-gray-700">Kasaragod general hopsiaal near railway station , pin 671319</p>
                                </div>
                                <div className="backdrop-blur-sm  bg-white p-4 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-violet-200 hover:border-2 transition-colors duration-300">
                                    <h2 className="text-sm mb-1 font-semibold">Kasaragod General Hospiatl</h2>
                                    <p className="text-gray-700">Kasaragod general hopsiaal near railway station , pin 671319</p>
                                </div>
                                <div className="backdrop-blur-sm  bg-white p-4 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-violet-200 hover:border-2 transition-colors duration-300">
                                    <h2 className="text-sm mb-1 font-semibold">Kasaragod General Hospiatl</h2>
                                    <p className="text-gray-700">Kasaragod general hopsiaal near railway station , pin 671319</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FindNearestBloodDonors