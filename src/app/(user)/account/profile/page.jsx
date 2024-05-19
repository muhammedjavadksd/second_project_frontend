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
                        <div className='mt-5'>


                            <div class="bg-white shadow-xl mt-3  p-5 pt-5">
                                <div>
                                    <div className='flex mb-3'>
                                        <h2 className='text-1xl'>Personal Details</h2>
                                        {!editPersonalDetails && <button type="button" class="ml-auto text-black flex gap-2 items-center bg-transparent font-medium rounded-lg text-sm   ">
                                            <i class="fa-solid fa-pencil"></i>    Edit Details
                                        </button>}
                                    </div>

                                    <form action="" method="post">
                                        <div className="grid flex gap-5 grid-cols-2">
                                            <div>
                                                {editPersonalDetails && <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>}
                                                <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Muhammed " required />
                                            </div>
                                            <div>
                                                {editPersonalDetails && <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>}
                                                <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Javad" required />
                                            </div>
                                        </div>
                                        {editPersonalDetails && <button type="button" class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Personal Details</button>}


                                    </form>
                                </div>


                                <div className="grid grid-cols-2 flex gap-5">
                                    <div className='mt-10'>
                                        <div className='flex mb-3'>
                                            <h2 className='text-1xl'>Personal Details</h2>
                                            {!editPersonalDetails && <button type="button" class="ml-auto text-black flex gap-2 items-center bg-transparent font-medium rounded-lg text-sm   ">
                                                <i class="fa-solid fa-pencil"></i>    Edit Details
                                            </button>}
                                        </div>

                                        <form action="" method="post">
                                            <div>
                                                {editPersonalDetails && <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>}
                                                <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="+91 9744727684 " required />
                                            </div>
                                            <div className='mt-5'>
                                                {editPersonalDetails && <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>}
                                                <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter OTP Number" required />
                                            </div>

                                            {editPersonalDetails && <button type="button" class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Personal Details</button>}


                                        </form>
                                    </div><div className='mt-10'>
                                        <div className='flex mb-3'>
                                            <h2 className='text-1xl'>Update Email Address</h2>
                                            {!editPersonalDetails && <button type="button" class="ml-auto text-black flex gap-2 items-center bg-transparent font-medium rounded-lg text-sm   ">
                                                <i class="fa-solid fa-pencil"></i>    Edit Details
                                            </button>}
                                        </div>

                                        <form action="" method="post">
                                            <div>
                                                {editPersonalDetails && <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>}
                                                <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="muhammedjavad119144@gmail.com " required />
                                            </div>
                                            <div className='mt-5'>
                                                {editPersonalDetails && <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>}
                                                <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter OTP Number" required />
                                            </div>
                                            {editPersonalDetails && <button type="button" class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Personal Details</button>}


                                        </form>
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