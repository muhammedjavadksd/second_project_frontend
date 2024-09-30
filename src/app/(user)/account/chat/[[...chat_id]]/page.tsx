"use client"
import ChatWithBloodDonors from '@/component/chat/page';
import BloodAccountTab from '@/component/Account/AccountTab/BloodAccountTab';
import BloodDonationHistoryProfile from '@/component/BloodAccount/BloodDonationHistory';
import Header from '@/component/Header/Header';
import UserPrivateRouter from '@/component/LoginComponent/UserPrivateRouter';
import BreadCrumb from '@/component/Util/BreadCrumb';
import Footer from '@/component/Util/Footer';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ChatComposition from '@/component/chat/ChatComposition';
// import Footer from 'react-multi-date-picker/plugins/range_picker_footer';
import io from "socket.io-client";
import { useSession } from 'next-auth/react';
import { userDetailsFromUseSession } from '@/util/data/helper/authHelper';
import { IMessageTemplate } from '@/util/types/InterFace/UtilInterface';


function ChatWithDonors() {

    const { chat_id } = useParams()
    const [currentChatId, setChatId] = useState<string>(null)



    useEffect(() => {
        if (typeof chat_id == "object" && chat_id.length) {
            setChatId(chat_id[0])
        }
    }, [chat_id])



    return (
        <UserPrivateRouter>

            <Header />
            <div className=" mt-5">
                <BloodAccountTab />
                <div className="mt-5">
                    <div className="flex gap-5">
                        <ChatComposition chat_id={chat_id && chat_id.toString()} />
                    </div>
                </div>
            </div>
        </UserPrivateRouter>
    )
}


export default ChatWithDonors