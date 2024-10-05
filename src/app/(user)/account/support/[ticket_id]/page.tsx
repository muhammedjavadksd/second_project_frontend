"use client"
import Header from "@/component/Header/Header";
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter";
import BreadCrumb from "@/component/Util/BreadCrumb";
import AccountTab from '@/component/Account/AccountTab/ProfileTab'
import Link from "next/link";
import Footer from "@/component/Util/Footer";
import { useEffect, useRef, useState } from "react";
import { ProfileTicket } from "@/util/types/API Response/Profile";
import SpalshScreen from "@/component/Util/SplashScreen";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import { addChatToTicket, findSingleTicket } from "@/util/data/helper/APIHelper";
import { useParams } from "next/navigation";
import { TicketChatFrom } from "@/util/types/Enums/BasicEnums";
import { formatDateToMonthNameAndDate } from "@/util/data/helper/utilHelper";
import { toast } from "react-toastify";
import LoadingComponent from "@/component/Util/LoadingComponent";

function ViewTicket() {

    const [ticket, setTicket] = useState<ProfileTicket>(null)
    const { ticket_id } = useParams();
    const fileRef = useRef(null)
    const [isLoading, setLoading] = useState<boolean>(false)

    const [attachment, setAttachment] = useState<File>(null)
    const chatRef = useRef(null);
    const messagesRef = useRef(null);


    useEffect(() => {
        if (messagesRef.current) {
            // alert(messagesRef.current.scrollHeight)
            console.log(messagesRef.current);

            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [ticket]);

    async function addChat() {
        setLoading(true)
        addChatToTicket(chatRef.current.value, attachment, ticket_id.toString()).then((response) => {
            if (response || response == "") {
                const newChat = {
                    attachment: response,
                    chat_id: null,
                    created_at: new Date(),
                    from: TicketChatFrom.User,
                    text: chatRef.current.value
                }
                const cloneTicket = { ...ticket };
                cloneTicket.chats.push(newChat)
                setTicket(cloneTicket)
                setAttachment(null)
                chatRef.current.value = "";
            }
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            toast.error("Something went wrong")
        })
    }


    async function findTicket() {
        findSingleTicket(ticket_id.toString()).then((response) => {
            if (response) {
                setTicket(response);
            }
        }).catch((err) => { })
    }

    useEffect(() => {
        findTicket()
    }, [])
    if (!ticket) {
        return <SpalshScreen />
    }

    return (
        <UserPrivateRouter>
            <Header />
            <div className="container mx-auto mt-5 mb-5">

                <div>

                    <div className="mb-3">
                        <AccountTab />
                    </div>

                    <div className="w-full bg-gray-200">

                        <div>

                            <LoadingComponent closeOnClick={false} isLoading={isLoading} paddingNeed={false}>
                                <div className="relative bg-gray-200 p-5 overflow-x-auto shadow-md sm:rounded-lg">
                                    <h2 className="text-2xl font-bold mb-4">Ticket #{ticket.ticket_id}</h2>
                                    <div className="mb-4">
                                        <p><strong>Title:</strong> {ticket.title}</p>
                                        <p><strong>Priority:</strong> {ticket.priority}</p>
                                        <p><strong>Status:</strong> {ticket.status}</p>
                                    </div>

                                    <ul ref={messagesRef} className="max-h-96 overflow-auto">
                                        {
                                            ticket.chats.map((chat, index) => {
                                                return (
                                                    <li key={index}>
                                                        <div className="mb-4 overflow-hidden">
                                                            <div className={`bg-gray-100 p-4 mb-2 rounded-md border-l-4 w-2/4 ${chat.from == TicketChatFrom.User ? "border-blue-500 float-right " : "border-green-500"}`}>
                                                                <div className="flex justify-between items-center">
                                                                    <p><strong>User:</strong> {chat.from == TicketChatFrom.User ? "You " : "Admin"}</p>
                                                                    <p className="text-gray-500 text-sm">{formatDateToMonthNameAndDate(chat.created_at)}</p>
                                                                </div>
                                                                <p>{chat.text}</p>
                                                                {
                                                                    chat.attachment && (
                                                                        <a href={chat.attachment} type="button" target="_black" className="text-blue-700 underline text-sm mt-3 block">View attachment</a>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }

                                    </ul>


                                    <div className="mt-4">

                                        {
                                            attachment && (
                                                <div className="bg-blue-300 flex justify-between w-full text-black p-2 rounded-se-lg rounded-ss-lg">
                                                    <div>
                                                        <i className="fa-solid fa-link"></i>
                                                        {attachment.name}
                                                    </div>
                                                    <button onClick={() => setAttachment(null)}><i className="fa-solid fa-xmark"></i></button>
                                                </div>
                                            )
                                        }
                                        <>
                                            <div className="flex">
                                                <textarea ref={chatRef} className={` w-full  border-gray-300 rounded-ss-md rounded-se-md rounded-es-md rounded-ee-md  ${attachment && "rounded-ss-none rounded-se-none"}`} placeholder="Type your reply here..." rows={1}></textarea>
                                                <button onClick={() => fileRef.current.click()} className={`bg-white p-3 border rounded-ss-md rounded-se-md rounded-es-md rounded-ee-md ${attachment && "rounded-se-none rounded-ss-none"}`}>
                                                    <i className="fa-solid fa-link"></i>
                                                </button>
                                            </div>
                                            <input onChange={(e) => setAttachment(e.target.files[0])} ref={fileRef} type="file" className="hidden" />
                                            <button onClick={addChat} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                                Send
                                            </button>
                                        </>
                                    </div>
                                </div>
                            </LoadingComponent>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </UserPrivateRouter >
    )
}

export default ViewTicket