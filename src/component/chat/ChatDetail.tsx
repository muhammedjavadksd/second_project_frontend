import { Fragment, useEffect, useRef, useState } from "react"
import ChatMessageList from "./ChatMessageList"
import { BlockedStatus, ChatHistory } from "@/util/types/API Response/Profile"
import { userDetailsFromUseSession } from "@/util/data/helper/authHelper";
import { useSession } from "next-auth/react";
import { Socket } from "socket.io-client";
import AvatarIcon from "../Util/avatarIcon";
import { FaUser, FaUserSlash } from "react-icons/fa";
import { blockProfile } from "@/util/data/helper/APIHelper";
import { toast } from "react-toastify";



function ChatDetail({ chatHistory, my_name, sender_name, room_id, socket, blockStatus, memberId }: { chatHistory: ChatHistory[], my_name: string, sender_name: string, room_id: string, socket: Socket, blockStatus: BlockedStatus, memberId: string }) {

    const msgRef = useRef(null);
    const session = useSession();
    const messagesRef = useRef(null);

    const [chatHistoryState, setHistory] = useState<ChatHistory[]>([]);
    const [isBlockOpen, toggleBlock] = useState<boolean>();
    const [isBlocked, setBlockStatus] = useState<boolean>(false);
    const [member_id, setMemberId] = useState(memberId)

    useEffect(() => {
        setMemberId(memberId)
    }, [memberId])



    useEffect(() => {
        if (blockStatus.status) {
            if (blockStatus.blocked_from != memberId) {
                setBlockStatus(true)
            } else {
                setBlockStatus(false)
            }
        } else {
            setBlockStatus(false)
        }
    }, [memberId])

    function onBlockUpdate() {
        blockProfile(isBlocked ? "unblock" : "block", room_id).then((data) => {
            if (data.status) {
                toast.success(data.msg)
                setBlockStatus(!isBlocked)
            } else {
                toast.error(data.msg)
            }
        }).catch((err) => {
            toast.error("Something went wrong")
        })
    }



    useEffect(() => {
        moveDown()
    }, [chatHistoryState])

    useEffect(() => {
        console.log("Chat updated");

        setHistory(chatHistory)
    }, [chatHistory])

    function moveDown() {
        console.log(messagesRef.current);

        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }

    useEffect(() => {
        // socket.off("new_message");
        console.log(member_id);
        // socket.on("new_message", (chat: ChatHistory) => {
        //     console.log("Message recivied");
        //     console.log("Member ID");


        //     console.log(chat);
        //     console.log(memberId);
        //     console.log(chat.profile_id);


        //     console.log(chat.profile_id + " " + member_id);
        //     console.log(chat.profile_id == member_id);



        //     // alert(chat.profile_id)
        //     if (chat.profile_id == member_id) {
        //         console.log(chatHistoryState);

        //         setHistory((prev) => [...prev, chat])
        //         console.log("New message recivied");
        //     }
        // })

        const addEnter = (e) => {
            if (e.key == "Enter") {
                onMessage()
            }
        }
        document.addEventListener("keypress", addEnter);

        return () => {
            document.removeEventListener("keydown", addEnter)
        }
    }, [memberId, member_id])


    function onMessage() {
        const message = msgRef.current.value;
        if (message && message != "") {
            const userDetails = userDetailsFromUseSession(session, "user");
            const newMsg: ChatHistory = {
                _id: null,
                msg: message,
                profile_id: userDetails.profile_id,
                room_id: room_id,
                seen: false,
                timeline: new Date(),
                is_block: {
                    status: false,
                    blocked_from: ""
                }
            }
            msgRef.current.value = null
            if (socket) {
                socket.emit("message", newMsg)
                setHistory((prev) => [...prev, newMsg])
            }
        }
    }
    return (
        <Fragment>
            <div className="flex w-[600px] h-[540px] flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100"  >
                <div className="flex bg-blue-800 items-center justify-between   p-2 rounded-ss-lg rounded-se-lg">
                    <div className="flex items-center space-x-4">
                        <div className="relative group">
                            <AvatarIcon name={sender_name} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">{sender_name}</h2>
                            <p className="text-sm text-indigo-100">{memberId}</p>
                        </div>
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => toggleBlock(!isBlockOpen)}
                            className="flex items-center space-x-1 text-white hover:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-md p-2 transition duration-300 ease-in-out transform hover:scale-105"
                            aria-label="Open blocking menu"
                        >
                            {isBlocked ? <FaUserSlash className="w-5 h-5" /> : <FaUser className="w-5 h-5" />}
                            {/* <MdKeyboardArrowDown className="w-5 h-5" /> */}
                        </button>

                        {
                            isBlockOpen && <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                <button
                                    onClick={onBlockUpdate}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                >
                                    {isBlocked ? "Unblock profile" : "Block profile"}
                                </button>
                            </div>
                        }
                    </div>
                </div>
                <div ref={messagesRef} className="flex flex-col h-full overflow-x-auto mb-4">
                    <div className="flex flex-col h-full">
                        <div className="grid grid-cols-12 gap-y-2">
                            <ChatMessageList my_name={my_name} sender_name={sender_name} chatHistory={chatHistoryState} profile_id={memberId} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row p-2 items-center h-16 rounded-xl bg-white w-full px-4">
                    {
                        !isBlocked ? <>
                            <div className="flex-grow ml-4">
                                <div className="relative w-full">
                                    <input ref={msgRef} type="text" placeholder="Type a new message" className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" />
                                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <button onClick={onMessage} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                                    <span>Send</span>
                                    <span className="ml-2">
                                        <svg
                                            className="w-4 h-4 transform rotate-45 -mt-px"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                            ></path>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </> : (
                            <>
                                <span className="text-center w-full text-gray-600">Profile blocked! Unblock to continue the message</span>
                            </>
                        )
                    }
                </div>
            </div>
        </Fragment >
    )
}

export default ChatDetail