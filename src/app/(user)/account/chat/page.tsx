"use client"
import ChatWithBloodDonors from '@/app/(user)/chat/chat-with-blood-donors/page';
import BloodAccountTab from '@/component/Account/AccountTab/BloodAccountTab';
import BloodDonationHistoryProfile from '@/component/BloodAccount/BloodDonationHistory';
import Header from '@/component/Header/Header';
import UserPrivateRouter from '@/component/LoginComponent/UserPrivateRouter';
import BreadCrumb from '@/component/Util/BreadCrumb';
import Footer from '@/component/Util/Footer';
import React from 'react';
// import Footer from 'react-multi-date-picker/plugins/range_picker_footer';


function ChatWithDonors() {

    return (
        <UserPrivateRouter>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <BloodAccountTab />
                <div className="mt-5">
                    <ChatWithBloodDonors></ChatWithBloodDonors>
                </div>
            </div>
            <Footer />
        </UserPrivateRouter>
    )
}


export default ChatWithDonors