import { addMessageToChat } from "@/util/data/helper/APIHelper";
import { userDetailsFromUseSession } from "@/util/data/helper/authHelper";
import { findNameAvatar } from "@/util/data/helper/utilHelper"
import { ChatHistory } from "@/util/types/API Response/Profile"
import { ICurrentUser, IMessageTemplate } from "@/util/types/InterFace/UtilInterface"
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react"
import ChatMessageList from "../chat/ChatMessageList";




function SingleChatScreen({ msg, current_user, room_id }: { msg: ChatHistory[], current_user: ICurrentUser, room_id: string }) {

    const [chatHistory, setHistory] = useState<ChatHistory[]>(msg);
    const msgRef = useRef(null);
    const session = useSession();
    const userDetails = userDetailsFromUseSession(session, "user");
    const profile_id = userDetails?.profile_id;

    function onMessage() {
        if (profile_id) {
            addMessageToChat(msgRef.current.value, room_id).then((data) => {
                if (data) {
                    const newMsg: ChatHistory = {
                        _id: null,
                        is_block: false,
                        msg: msgRef.current.value,
                        profile_id,
                        room_id,
                        seen: false,
                        timeline: new Date()
                    }
                    setHistory((prev) => [...prev, newMsg])
                    msgRef.current.value = null
                }
            })
        } else {
            alert("no profile")
        }
    }

    return (
        <div style={{ height: "600px" }} className="w-full bg-gray-100  border-r border-gray-300 dark:border-gray-700 flex flex-col">
            <div className="flex items-center p-4 border-b border-gray-300 dark:border-gray-700">
                <div className="bg-gray-200 rounded-full p-2">
                    {findNameAvatar(current_user.name)}
                    {msg.length}
                </div>
                <div className="ml-3">
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{current_user.name}</p>
                </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-4 w-full overflow-hidden">
                    <ChatMessageList chatHistory={chatHistory} profile_id={profile_id} />
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
    )
}

export default SingleChatScreen