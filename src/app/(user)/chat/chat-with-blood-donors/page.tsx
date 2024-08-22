"use client"
import AccountTab from "@/component/Account/AccountTab/ProfileTab";
import Header from "@/component/Header/Header";
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter";
import SingleChatScreen from "@/component/section/SingleChatScreen";
import BreadCrumb from "@/component/Util/BreadCrumb";
import SpalshScreen from "@/component/Util/SplashScreen";
import { userDetailsFromUseSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import { ChatFrom } from "@/util/types/Enums/BasicEnums";
import { ChatApiResponse, IMessageTemplate } from "@/util/types/InterFace/UtilInterface";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { bool, boolean } from "yup";


function ChatWithBloodDonors(): React.ReactElement {



    return (
        <>
            <div className="flex gap-5">
                <ChatScreen></ChatScreen>
            </div>
        </>
    )
}

const ChatScreen = () => {

    const session = useSession();
    const [chats, setChats] = useState<ChatApiResponse[]>([]);
    const [isDonor, setDonor] = useState<null | boolean>(false);
    const userDetails = userDetailsFromUseSession(session, "user");
    const [currentMsg, setCurrentMsg] = useState<ChatApiResponse>()

    async function refereshChats() {
        console.log(session);
        const userDetails = userDetailsFromUseSession(session, "user");

        const token = userDetails.token;
        const bloodToken = userDetails.blood_token;


        if (token && bloodToken) {

            try {
                const getMyChats = await API_axiosInstance.get("blood/get_chats", {
                    headers: {
                        authorization: `Bearer ${token}`,
                        bloodauthorization: `Bearer ${bloodToken}`
                    }
                })
                const response = getMyChats.data;
                console.log(response);

                if (response.status) {
                    const chats: ChatApiResponse[] = response?.data?.chats
                    setCurrentMsg(chats[0])
                    setChats(chats ?? [])
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        refereshChats();
    }, [session])


    if (isDonor == null) {
        return <SpalshScreen></SpalshScreen>
    }

    return (

        <div style={{ height: "500px" }} className="flex  bg-gray-100 w-full">
            {/* Left Panel: Users List */}
            <div className="w-1/4  bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 p-4">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Chats</h2>
                <ul className="space-y-2">
                    {chats.map((user: ChatApiResponse, index) => {
                        console.log(user.chats[user.chats.length - 1].msg.trim());

                        let name = user.from_profile_id == userDetails.profile_id ? user.blood_requirements.patientName : user.donor.full_name;

                        return <li key={index} className={`flex items-center p-2 rounded-lg cursor-pointer transition-all ${index % 2 === 0 ? 'hover:bg-gray-200 dark:hover:bg-gray-700' : 'bg-gray-200 dark:bg-gray-700'}`}>
                            <img className="w-10 h-10 rounded-full object-cover" src={`https://via.placeholder.com/50?text=U${user}`} alt={`User ${user}`} />
                            <div className="ml-3">
                                <p className="text-gray-800 dark:text-gray-100 font-semibold">{name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {
                                        user.chats[user.chats.length - 1].msg.trim().slice(0, 50)
                                    }...
                                </p>
                            </div>
                        </li>

                    })}
                </ul>
            </div>



            <SingleChatScreen
                current_user={
                    currentMsg?.from_profile_id == userDetails.profile_id ? {
                        name: currentMsg?.blood_requirements?.patientName,
                        chat_from: ChatFrom.Donor,

                    } : {
                        name: currentMsg.donor.full_name,
                        chat_from: ChatFrom.Patient
                    }
                }
                msg={currentMsg?.chats}
            />

            <div className="w-1/4  bg-gray-100 dark:bg-gray-800 p-4">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Profile</h2>
                <div className="flex items-center">
                    <img className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-900" src="https://via.placeholder.com/100?text=User" alt="Profile" />
                    <div className="ml-4">
                        <p className="text-xl font-bold text-gray-800 dark:text-gray-100">Current User</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Location: City</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Status: Available</p>
                    </div>
                </div>
                <div className="mt-4">
                    <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200">Send Message</button>
                </div>
            </div>
            { }
        </div >
    )
};



export default ChatWithBloodDonors