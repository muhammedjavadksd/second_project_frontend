import { useEffect, useRef, useState } from "react";
import SingleChatScreen from "../section/SingleChatScreen";
import ChatUsersList from "./ChatUserList";
import ChatUserProfile from "./ChatUserProfile";
import { ChatHistory, ChatProfile } from "@/util/types/API Response/Profile";
import { useSession } from "next-auth/react";
import { addMessageToChat, getSingleChat } from "@/util/data/helper/APIHelper";
import { io } from "socket.io-client";
import { userDetailsFromUseSession } from "@/util/data/helper/authHelper";
import { findNameAvatar } from "@/util/data/helper/utilHelper";
import ChatMessageList from "./ChatMessageList";


function ChatComposition({ chat_id }) {

    const [currentChat, setCurrentChat] = useState<ChatProfile | false>(null)
    const session = useSession();
    const userDetails = userDetailsFromUseSession(session, "user");
    const msgRef = useRef(null);
    const [chatHistory, setHistory] = useState<ChatHistory[]>();
    const socket = io(process.env.NEXT_PUBLIC_SOKCET_URL, {
        transports: ['websocket', 'polling'],
        query: {
            token: `Bearer ${userDetails.token}`
        }
    })

    function onMessage() {
        console.log(userDetails.profile_id);
        if (userDetails.profile_id) {
            const newMsg: ChatHistory = {
                _id: null,
                is_block: false,
                msg: msgRef.current.value,
                profile_id: userDetails.profile_id,
                room_id: chat_id,
                seen: false,
                timeline: new Date()
            }




            socket.emit("message", newMsg)
            setHistory((prev) => [...prev, newMsg])
        }
    }

    useEffect(() => {
        socket.emit("join", userDetails.profile_id);

        socket.on("new_message", (message) => {
            setHistory((prev) => [...prev, message])
        });

        return () => {
            socket.off("new_message");
        };
    }, [chat_id, session, userDetails]);

    async function getChat() {
        getSingleChat(chat_id).then((data) => {
            if (data) {
                console.log(data);
                setCurrentChat(data)
                setHistory(data.chat_history)
            }
        }).catch((err) => { })
    }

    useEffect(() => {
        getChat()
    }, [])

    if (!currentChat) {
        return null
    }

    return (

        <>
            <div className="w-full flex">
                <div className="w-1/4">
                    <ChatUsersList></ChatUsersList>
                </div>
                <div className="w-2/4">
                    <div style={{ height: "600px" }} className="w-full bg-gray-100  border-r border-gray-300 dark:border-gray-700 flex flex-col">
                        <div className="flex items-center p-4 border-b border-gray-300 dark:border-gray-700">
                            <div className="bg-gray-200 rounded-full p-2">
                                {findNameAvatar((currentChat.chat_person.first_name.concat(" ", currentChat.chat_person.last_name)))}
                            </div>
                            <div className="ml-3">
                                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{currentChat.chat_person.first_name.concat(" ", currentChat.chat_person.last_name)}</p>
                            </div>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                            <ul className="space-y-4 w-full overflow-hidden">
                                <ChatMessageList chatHistory={chatHistory} profile_id={userDetails.profile_id} />
                            </ul>
                        </div>
                        <div className="flex items-center p-3 border-t border-gray-300 dark:border-gray-700">
                            <input ref={msgRef} type="text" placeholder="Type a message..." className="flex-1 p-2 rounded-full bg-gray-100 dark:bg-gray-700 outline-none placeholder-gray-500 dark:placeholder-gray-400" />
                            <button onClick={onMessage} className="ml-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200">
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-1/4">
                    <ChatUserProfile isBlock={false} />
                </div>
            </div>
        </>
    )
}

export default ChatComposition