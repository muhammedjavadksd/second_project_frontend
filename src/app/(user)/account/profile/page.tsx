"use client";
import AccountTab from '@/component/Account/AccountTab'
import EditUserEmailAddress from '@/component/Account/EditEmailID/EditUserEmailAddress';
import EditUserPhoneNumber from '@/component/Account/EditPhoneNumber/EditUserPhoneNumber';
import EditProfileComponent from '@/component/Account/EditProfile/EditProfile';
import Header from '@/component/Header/Header'
import UserPrivateRouter from '@/component/LoginComponent/UserPrivateRouter';
import BreadCrumb from '@/component/Util/BreadCrumb'
import Footer from '@/component/Util/Footer'
import React, { useState } from 'react'

function page(): React.ReactElement {

    let [editPersonalDetails, setEditPersonalDetails] = useState<boolean>(false);


    return (
        <UserPrivateRouter>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Profile', 'View Profile']} />
                </div>
                <div className="flex gap-5">
                    <div className="w-1/4">
                        <AccountTab />
                    </div>
                    <div className="w-4/5">
                        <div>
                            <h4 className="font-medium text-3xl mb-2">Hi, Muhammed Javad</h4>
                            <p>Here is your daily activities, and history</p>
                        </div>
                        <div className="mt-5">
                            <div className="bg-white shadow mt-3 mb-5 p-5 pt-5">
                                <div>
                                    <div className="flex mb-3">
                                        <h2 className="text-1xl">Personal Details</h2>
                                        {!editPersonalDetails && (
                                            <button
                                                onClick={() => setEditPersonalDetails(!editPersonalDetails)}
                                                type="button"
                                                className="ml-auto text-black flex gap-2 items-center bg-transparent font-medium rounded-lg text-sm"
                                            >
                                                <i className="fa-solid fa-pencil"></i> Edit Details
                                            </button>
                                        )}
                                    </div>
                                    <EditProfileComponent editPersonalDetails={editPersonalDetails} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="bg-white shadow p-5 pt-5 mt-1 h-fit">
                                    <EditUserPhoneNumber />
                                </div>
                                <div className="bg-white shadow p-5 pt-5 mt-1 h-fit">
                                    <EditUserEmailAddress />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </UserPrivateRouter>
    )
}

export default page