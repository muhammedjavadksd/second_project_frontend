"use client"
import AccountTab from "@/component/Account/AccountTab/ProfileTab";
import Header from "@/component/Header/Header";
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter";
import SingleChatScreen from "@/component/section/SingleChatScreen";
import BreadCrumb from "@/component/Util/BreadCrumb";
import SpalshScreen from "@/component/Util/SplashScreen";
import { userDetailsFromUseSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import { ChatApiResponse, IChatRoomResponse, IMessageTemplate } from "@/util/types/InterFace/UtilInterface";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { bool, boolean } from "yup";
import SingleChat from "./SingleChat";
import ChatComposition from "./ChatComposition";


function ChatWithBloodDonors(): React.ReactElement {



    return (
        <>
            <div className="flex gap-5">
                {/* <ChatScreen></ChatScreen> */}
                {/* <ChatComposition /> */}
            </div>
        </>
    )
}





export default ChatWithBloodDonors