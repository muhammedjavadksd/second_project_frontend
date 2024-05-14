import AccountTab from '@/_component/Account/AccountTab'
import Header from '@/_component/Header/Header'
import BreadCrumb from '@/_component/Util/BreadCrumb'
import Footer from '@/_component/Util/Footer'
import React from 'react'

function EditProfile() {
    return (
        <>
            <Header />
            <div className="container mx-auto mt-5  mb-5">
                <BreadCrumb path={['Home', 'Profile', 'Edit Profile']} />
                <div className="flex gap-10 mt-5">
                    <div className='w-1/4'>
                        <AccountTab />
                    </div>
                    <div className='w-4/5'>
                        {/* <h4 className='font-medium text-2xl'>Basic profile</h4> */}

                        <div className='mt-5 bg-white shadow-mds'>
                            <div className="grid flex gap-10 grid-cols-2">
                                <div>
                                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                    <input placeholder='Enter first name' type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>

                                <div>
                                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name name</label>
                                    <input placeholder='Enter last name' type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="mt-5">
                                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Basic Profile</button>
                            </div>
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
            <Footer />
        </>
    )
}

export default EditProfile