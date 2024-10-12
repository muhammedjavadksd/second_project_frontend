import React, { useState, useEffect } from "react";
import { FaSearch, FaCommentAlt, FaTimes, FaSpinner, FaComment } from "react-icons/fa";
import SpinnerLoader from "../Util/SpinningLoader";
import { useSession } from "next-auth/react";
import { userDetailsFromUseSession } from "@/util/data/helper/authHelper";
import { getChatList, getSingleChat, seenMessage } from "@/util/data/helper/APIHelper";
import { ChatApiResponse, IChatMessageDetails, IChatRoomResponse } from "@/util/types/InterFace/UtilInterface";
import AvatarIcon from "../Util/avatarIcon";
import ChatDetail from "./ChatDetail";
import ChatPerson from "./ChatPerson";
import { ChatHistory, ChatProfile } from "@/util/types/API Response/Profile";
import { io } from "socket.io-client";


let socket;

const ChatUserList = () => {
    const [users, setUsers] = useState<IChatRoomResponse[]>([]);
    const [tempUsers, setTempUsers] = useState<IChatRoomResponse[]>([]);
    const [openChats, setOpenChats] = useState<ChatProfile>(null);
    const [currentChatHistory, setCurrentChatHistory] = useState<ChatHistory[]>([]);
    const [isLoading, toggleLoading] = useState(true)


    const session = useSession();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {

        if (users && users.length) {
            if (!socket) {
                socket = io(process.env.NEXT_PUBLIC_SOKCET_URL, {
                    transports: ['websocket', 'polling'],
                    query: {
                        token: `Bearer ${userDetails?.token}`
                    }
                })
            }

            socket.emit("join", userDetails.profile_id)
            socket.off("new_message");
            socket.on("new_message", (chat: ChatHistory) => {
                console.log("New message recivied");

                console.log(openChats)
                console.log(chat)
                if (openChats.chat_profile_id == chat.profile_id) {
                    setCurrentChatHistory((prev) => [...prev, chat])
                }


                setUsers((prevUsers) => {
                    const toProfileId = chat.profile_id;
                    const findIndex = prevUsers.findIndex((each) => each.chat_profile_id === toProfileId);

                    if (findIndex !== -1) {
                        // Clone the user list immutably
                        const updatedUsers = prevUsers.map((user, index) => {
                            if (index === findIndex) {
                                // Increment unseen_message_count without mutating state directly
                                return {
                                    ...user,
                                    messages: {
                                        ...user.messages,
                                        last_message: chat.msg,
                                        last_message_from: toProfileId,
                                        unseen_message_count: user.messages.unseen_message_count + 1, // Increment properly
                                    },
                                };
                            }
                            return user;
                        });

                        return updatedUsers;
                    } else {
                        console.log("User not found in the list");
                        return prevUsers; // Return the original state if no match
                    }
                });
                // console.log("New message recivied");


                // const toProfileId = chat.profile_id;
                // const findIndex = users.findIndex((each) => each.chat_profile_id == toProfileId)
                // console.log("User  find");
                // console.log(toProfileId);
                // console.log(users);


                // if (findIndex != -1) {
                //     const updatedUsers = [...users];
                //     const updatedUser = {
                //         ...updatedUsers[findIndex],
                //         messages: {
                //             ...updatedUsers[findIndex].messages,
                //             last_message: chat.msg,
                //             last_message_from: toProfileId,
                //             // unseen_message_count: updatedUsers[findIndex].messages.unseen_message_count + 1,
                //         },
                //     };

                //     console.log("Count");
                //     console.log(updatedUser.messages.unseen_message_count);
                //     const updatedCount = updatedUser.messages.unseen_message_count + 1
                //     console.log(updatedCount);
                //     updatedUser.messages.unseen_message_count = updatedCount



                //     console.log(updatedUsers);
                //     console.log(updatedUser);


                //     updatedUsers[findIndex] = updatedUser;
                //     setUsers([...updatedUsers]);

                // } else {
                //     console.log("Index failed");
                // }
            })
        }



    }, [users, openChats])







    useEffect(() => {
        setUserDetails(userDetailsFromUseSession(session, "user"))
    }, [session])


    function filterUsers(name) {
        const newUsers = tempUsers.filter((each) => {
            const fullName = each.chat_person.first_name.concat(" " + each.chat_person.last_name);
            return fullName.startsWith(name)
        })
        setUsers(newUsers)
    }

    function openChat(room_id: string) {
        toggleLoading(true)
        getSingleChat(room_id).then(async (data) => {
            if (data) {
                setOpenChats(data)
                setCurrentChatHistory(data.chat_history)
                const findIndex = users.findIndex((each) => each.chat_profile_id == data.chat_profile_id);
                if (findIndex != -1) {
                    const user = users[findIndex];
                    if (user) {
                        console.log(user);
                        user['messages']['unseen_message_count'] = 0
                        const tempData = users;
                        tempData[findIndex] = user
                        setUsers(tempData)
                    } else {
                        console.log("No user found");
                    }
                }

            }
        }).finally(() => {
            toggleLoading(false)
        })
    }

    useEffect(() => {
        if (userDetails?.token) {
            getChatList(userDetails.token).then((data) => {
                console.log(data);
                setUsers(data.data)
                setTempUsers(data.data)
            }).finally(() => {
                toggleLoading(false)
            })
        }
    }, [userDetails]);







    return (
        <div className="flex gap-3">
            <div className="max-w-[430px] mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 bg-blue-800 text-white">
                    <h2 className="text-2xl font-bold">Chat Users</h2>
                </div>
                <div className="p-4">
                    <div className="relative">
                        <input type="text" placeholder="Search users..." className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => filterUsers(e.target.value)} aria-label="Search users" />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                </div>
                {
                    isLoading ? (
                        <div className="h-[400px] flex justify-center items-center w-96">
                            <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
                        </div>
                    ) : (
                        users && users.length ? (

                            <ul className="divide-y px-4 h-[400px] w-[380px]  divide-gray-200">
                                {users.map((user: IChatRoomResponse, index: number) => (
                                    <div key={index} onClick={() => openChat(user.chat_id)}>
                                        <>
                                            <ChatPerson unseen_message_count={user.messages.unseen_message_count} chat={user.messages} name={user.chat_person.first_name.concat(" " + user.chat_person.last_name)} />
                                        </>
                                    </div>
                                ))}
                            </ul>
                        ) : (
                            <div>
                                <div className="h-[400px] flex flex-col justify-center items-center w-96">
                                    <FaComment className=" text-4xl text-blue-500 mb-4" />
                                    <h4>No message&apos;s found</h4>

                                </div>
                            </div>
                        )
                    )
                }
            </div>
            The length{currentChatHistory.length}
            {openChats && (
                <ChatDetail memberId={openChats.chat_person.profile_id} blockStatus={openChats.blocked} room_id={openChats.chat_id} socket={socket} my_name={userDetails.first_name.concat("  " + userDetails.last_name)} sender_name={openChats.chat_person.first_name.concat(openChats.chat_person.last_name)} chatHistory={currentChatHistory} />
            )}
        </div>
    );
};

export default ChatUserList;