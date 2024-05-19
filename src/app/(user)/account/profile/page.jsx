"use client";
import AccountTab from '@/_component/Account/AccountTab'
import Header from '@/_component/Header/Header'
import BreadCrumb from '@/_component/Util/BreadCrumb'
import FileSelectBox from '@/_component/Util/FileSelectBox'
import Footer from '@/_component/Util/Footer'
import React, { useState } from 'react'

function page() {

    let [editPersonalDetails, setEditPersonalDetails] = useState(false);
    let [editPhoneNumber, setEditPhoneNumber] = useState(false);
    let [editEmailAddress, setEmailAddress] = useState(false);


    let nums=[1,2,3,4,5];
    let newData= nums.map(manipulate)


    function manipulate(num){
        return 10 
    }

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


                            <div class="bg-white shadow mt-3 mb-5 p-5 pt-5">
                                <div>
                                    <div className='flex mb-3'>
                                        <h2 className='text-1xl'>Personal Details</h2>
                                        {!editPersonalDetails && <button onClick={()=> setEditPersonalDetails(!editPersonalDetails)} type="button" class="ml-auto text-black flex gap-2 items-center bg-transparent font-medium rounded-lg text-sm   ">
                                            <i class="fa-solid fa-pencil"></i>    Edit Details
                                        </button>}
                                    </div>

                                    <form action="" method="post">
                                        <div className="grid flex gap-5 grid-cols-2">
                                            <div>
                                                <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Muhammed " required />
                                            </div>
                                            <div>
                                                <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Javad" required />
                                            </div>
                                        </div>
                                        {editPersonalDetails && <button type="button" class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Personal Details</button>}


                                    </form>
                                </div>
                            </div>



                            <div className="grid grid-cols-2 flex gap-5">
                                <div class="bg-white shadow  p-5 pt-5 mt-1 h-fit">

                                    <div className='mt-2'>
                                        <div className='flex mb-3'>
                                            <h2 className='text-1xl'>Phone Number</h2>
                                            {!editPhoneNumber && <button onClick={() => setEditPhoneNumber(!editPhoneNumber)} type="button" class="ml-auto text-black flex gap-2 items-center bg-transparent font-medium rounded-lg text-sm   ">
                                                <i class="fa-solid fa-pencil"></i>    Edit Details
                                            </button>}
                                        </div>

                                        <form action="" method="post">
                                            <div>
                                                <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="+91 9744727684 " required />
                                            </div>
                                            {editPhoneNumber && <div className='mt-5'>
                                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP</label>
                                                <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter OTP Number" required />
                                            </div>}

                                            {editPhoneNumber && <button type="button" class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Phone Number</button>}


                                        </form>
                                    </div>
                                </div>

                                <div class="bg-white shadow  p-5 pt-5 mt-1 h-fit">

                                    <div className='mt-2 h-fit'>
                                        <div className='flex mb-3'>
                                            <h2 className='text-1xl'> Email Address</h2>
                                            {!editEmailAddress && <button onClick={() => setEmailAddress(!editEmailAddress)} type="button" class="ml-auto text-black flex gap-2 items-center bg-transparent font-medium rounded-lg text-sm   ">
                                                <i class="fa-solid fa-pencil"></i>    Edit Details
                                            </button>}
                                        </div>

                                        <form action="" method="post">
                                            <div>
                                                <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="muhammedjavad119144@gmail.com " required />
                                            </div>
                                            {editEmailAddress && <div className='mt-5'>
                                                {editEmailAddress && <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP</label>}
                                                <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter OTP Number" required />
                                            </div>}
                                            {editEmailAddress && <button type="button" class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update Email Address</button>}


                                        </form>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default page