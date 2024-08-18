"use client";
import BloodAccountTab from '@/component/Account/AccountTab/BloodAccountTab';
import AccountTab from '@/component/Account/AccountTab/ProfileTab'
import BloodProfile from '@/component/BloodAccount/BloodProfile';
import IncomingRequestView from '@/component/BloodAccount/IncomingRequestView';
import OutGoingRequestView from '@/component/BloodAccount/OutGoingRequestView';
import Header from '@/component/Header/Header'
import UserPrivateRouter from '@/component/LoginComponent/UserPrivateRouter';
import BreadCrumb from '@/component/Util/BreadCrumb'
import Footer from '@/component/Util/Footer'
import React from 'react'
import BloodDonationHistory from '../blood_donation_history/page';
import BloodDonationHistoryCard from '@/component/Blood/BloodDonationHistoryCard';
import BloodDonationHistoryProfile from '@/component/BloodAccount/BloodDonationHistory';

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
                    {!<BloodProfile />}
                    {!<IncomingRequestView />}
                    {/* <OutGoingRequestView /> */}
                    <BloodDonationHistoryProfile />
                </div>

                {/* <div className="flex gap-5">
                    <div className="w-1/4">
                    </div>
                    <div className="w-4/5">
                        <div>
                            <h4 className="font-medium text-3xl mb-2">Hi, Muhammed Javad</h4>
                            <p>Here is your daily activities, and history</p>
                        </div>
                        <div className="mt-5">

                        </div>
                    </div>
                </div> */}
            </div>
            <Footer />
        </UserPrivateRouter>
    )
}


export default BloodAccount