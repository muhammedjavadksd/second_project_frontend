"use client";
import AccountTab from '@/_component/Account/AccountTab'
import EditUserEmailAddress from '@/_component/Account/EditEmailID/EditUserEmailAddress';
import EditUserPhoneNumber from '@/_component/Account/EditPhoneNumber/EditUserPhoneNumber';
import EditProfileComponent from '@/_component/Account/EditProfile/EditProfile';
import Header from '@/_component/Header/Header'
import UserPrivateRouter from '@/_component/LoginComponent/UserPrivateRouter';
import BreadCrumb from '@/_component/Util/BreadCrumb'
import Footer from '@/_component/Util/Footer'
import React, { useState } from 'react'

function page(): React.ReactElement {

    let [editPersonalDetails, setEditPersonalDetails] = useState<boolean>(false);


    return (
        <UserPrivateRouter>
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


                            <div className="bg-white shadow mt-3 mb-5 p-5 pt-5">
                                <div>
                                    <div className='flex mb-3'>
                                        <h2 className='text-1xl'>Personal Details</h2>
                                        {!editPersonalDetails && <button onClick={() => setEditPersonalDetails(!editPersonalDetails)} type="button" className="ml-auto text-black flex gap-2 items-center bg-transparent font-medium rounded-lg text-sm   ">
                                            <i className="fa-solid fa-pencil"></i>    Edit Details
                                        </button>}
                                    </div>

                                    <EditProfileComponent editPersonalDetails={editPersonalDetails}></EditProfileComponent>
                                </div>
                            </div>



                            <div className="grid grid-cols-2 flex gap-5">
                                <div className="bg-white shadow  p-5 pt-5 mt-1 h-fit">

                                    {/* <EditPhoneNumber></EditPhoneNumber> */}
                                    <EditUserPhoneNumber></EditUserPhoneNumber>
                                </div>

                                <div className="bg-white shadow  p-5 pt-5 mt-1 h-fit">

                                    <EditUserEmailAddress></EditUserEmailAddress>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </UserPrivateRouter>
    )
}

export default page