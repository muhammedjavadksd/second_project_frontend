"use client";
import AccountTab from '@/_component/Account/AccountTab'
import Header from '@/_component/Header/Header'
import BreadCrumb from '@/_component/Util/BreadCrumb'
import FileSelectBox from '@/_component/Util/FileSelectBox'
import Footer from '@/_component/Util/Footer'
import React, { useState } from 'react'

function page() {

    let [editPersonalDetails, setEditPersonalDetails] = useState(false);

    return (
        <>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    {
                        <BreadCrumb path={['Profile', 'View Profile']}></BreadCrumb>
                    }
                </div>
                <div className="flex gap-5">
                    <div className='w-1/4'>
                        <AccountTab />
                    </div>
                    <div className='w-4/5'>
                        <div>
                            <h4 className='font-medium text-3xl mb-2'>Hi, Muhammed Javad</h4>
                            <p>Here is your daily activities, and history</p>
                        </div>
                        <div className=" gap-10">
                            <div className='mt-5 bg-gray-100 rounded-lg p-5 shadow-mds'>
                               <div className='w-full ml-auto'>
                               <button type="button" class="ml-auto flex gap-3 text-black bg-transparent  font-medium rounded-lg text-xs mb-2 me-2 mb-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                    Edit Personal Details
                                </button>
                               </div>

                                <div className="grid flex gap-10 grid-cols-2">
                                    <div>
                                        {editPersonalDetails && <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>}
                                        <input placeholder='Enter first name' type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>

                                    <div>
                                        {editPersonalDetails && <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name name</label>}
                                        <input placeholder='Enter last name' type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                </div>
                                {
                                    editPersonalDetails && <div className="mt-5">
                                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Basic Profile</button>
                                    </div>
                                }
                            </div>

                            <div className="mt-5">

                                <div className="grid grid-cols-2 flex gap-10">
                                    <div className='mt-5 bg-white '>
                                        {/* <h4 className='font-medium text-2xl'>Update Phone Number</h4> */}
                                        <div>
                                            <div className='mt-5'>
                                                <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter phone number</label>
                                                <input placeholder='Enter first name' type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>
                                            <div className='mt-5'>
                                                <div>
                                                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP Number</label>
                                                    <input placeholder='Enter first name' type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Phone Number</button>
                                        </div>
                                    </div>

                                    <div className='mt-5 bg-white'>
                                        {/* <h4 className='font-medium text-2xl'>Update Email Address</h4> */}
                                        <div>
                                            <div className='mt-5'>
                                                <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter email address</label>
                                                <input placeholder='Enter first name' type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>
                                            <div className='mt-5'>
                                                <div>
                                                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP Number</label>
                                                    <input placeholder='Enter first name' type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Email Address</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page