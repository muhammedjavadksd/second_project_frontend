"use client";
import BloodAccountTab from '@/component/Account/AccountTab/BloodAccountTab';
import VerifyBloodRequestItem from '@/component/Blood/VerifyRequestItem';
import Header from '@/component/Header/Header'
import UserPrivateRouter from '@/component/LoginComponent/UserPrivateRouter';
import BreadCrumb from '@/component/Util/BreadCrumb'
import Footer from '@/component/Util/Footer'
import React from 'react'

function BloodAccount(): React.ReactElement {

    return (
        <UserPrivateRouter>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Profile', 'View Profile']} />
                </div>
                <BloodAccountTab />
                <div>
                    <div className="grid gap-y-2 gap-x-4 mt-5 grid-cols-3">
                        <VerifyBloodRequestItem />
                        <VerifyBloodRequestItem />
                        <VerifyBloodRequestItem />
                        <VerifyBloodRequestItem />
                    </div>
                </div>
            </div>
            <Footer />
        </UserPrivateRouter>
    )
}


export default BloodAccount