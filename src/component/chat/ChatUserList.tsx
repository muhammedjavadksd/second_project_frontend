import { userDetailsFromUseSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import { ChatApiResponse, IChatRoomResponse } from "@/util/types/InterFace/UtilInterface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TableSearch from "../Util/TableSearch";
import AvatarIcon from "../Util/avatarIcon";
import Link from "next/link";

function ChatUsersList({ refresh }) {

    const session = useSession();
    const [chatProfile, setChatProfile] = useState([]);
    const userDetails = userDetailsFromUseSession(session, "user");

    async function refereshChats() {




        const token = userDetails.token;
        if (token) {
            try {
                const getMyChats = await API_axiosInstance.get("profile/get_chat_rooms", {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                })
                const response = getMyChats.data;
                console.log(response);

                if (response.status) {
                    const chats: ChatApiResponse[] = response?.data?.chats
                    setChatProfile(chats)
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("No token found");
        }
    }


    useEffect(() => {
        refereshChats();
    }, [session, refresh])

    return (
        <div style={{ height: "600px" }} className="w-full  bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 p-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Chats</h2>
            <ul className="space-y-2">
                <TableSearch onSearch={() => { }} />
                {
                    chatProfile.map((user: IChatRoomResponse, index) => {

                        return (
                            <Link key={index} href={`chat/${user.chat_id}`}>
                                <li key={index} className={`flex items-center p-2 rounded-lg cursor-pointer transition-all ${user?.messages?.unseen_message_count && user.messages.last_message_from != userDetails?.profile_id ? ' bg-blue-300' : index % 2 === 0 ? 'hover:bg-gray-200 dark:hover:bg-gray-700' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                    <AvatarIcon name={user.chat_person.first_name + " " + user.chat_person.last_name} />
                                    <div className="ml-3">
                                        <p className="text-gray-800 dark:text-gray-100 font-semibold">{user.chat_person.first_name.concat(" ", user.chat_person.last_name)}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {user?.messages?.last_message?.slice(0, 25)}
                                        </p>
                                    </div>
                                    <span>
                                        {
                                            user?.messages?.unseen_message_count && user.messages.last_message_from != userDetails.profile_id ?
                                                <span className="inline-flex items-center justify-center w-6 h-6 ms-2 text-xs font-semibold text-blue-800 bg-white rounded-full">
                                                    {user?.messages?.unseen_message_count}
                                                </span> : null
                                        }
                                    </span>
                                </li>
                            </Link>
                        )

                    })}
            </ul>
        </div>
    )
}

export default ChatUsersList;