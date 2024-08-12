"use client"
import AccountTab from '@/component/Account/AccountTab'
import IncomingBloodCard from '@/component/Blood/IncomingBloodCard'
// import BloodCard from '@/component/Blood/BloodCard'

import Header from '@/component/Header/Header'
import UserPrivateRouter from '@/component/LoginComponent/UserPrivateRouter'
import BreadCrumb from '@/component/Util/BreadCrumb'
import Footer from '@/component/Util/Footer'
import React from 'react'

const ViewBloodRequest = () => {
    return (
        <>
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
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white">
                                        <IncomingBloodCard deadLine={"12/07/2005"} group={"A+"} location={"Kasaragod"} onDonateBlood={() => { }} unit={"2"} username={"Muhammed Javad"} ></IncomingBloodCard>
                                    </div>
                                    <div className="bg-white">
                                        <IncomingBloodCard deadLine={"12/07/2005"} group={"A+"} location={"Kasaragod"} onDonateBlood={() => { }} unit={"2"} username={"Muhammed Javad"} ></IncomingBloodCard>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </UserPrivateRouter>
        </>
    )
}

export default ViewBloodRequest