"use client";
import FundRaiserAccountTab from '@/component/Account/AccountTab/FundRaiserAccountTab';
import AccountTab from '@/component/Account/AccountTab/ProfileTab'
import Header from '@/component/Header/Header'
import UserPrivateRouter from '@/component/LoginComponent/UserPrivateRouter';
import BreadCrumb from '@/component/Util/BreadCrumb'
import Footer from '@/component/Util/Footer'
import React, { useState } from 'react'

function FundRaiserAccount(): React.ReactElement {



    return (
        <UserPrivateRouter>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Profile', 'View Profile']} />
                </div>
                <FundRaiserAccountTab />
                <div className="flex gap-5">

                </div>
            </div>
            <Footer />
        </UserPrivateRouter>
    )
}


export default FundRaiserAccount