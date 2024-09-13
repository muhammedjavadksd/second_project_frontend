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

function ViewTicket() {

    const [ticket, setTicket] = useState<ProfileTicket>(null)
    const { ticket_id } = useParams();
    const chatRef = useRef(null)

    async function addChat() {
        addChatToTicket(chatRef.current.value, ticket_id.toString()).then((response) => {
            if (response) {
                const newChat = { attachment: null, chat_id: null, created_at: new Date(), from: TicketChatFrom.User, text: chatRef.current.value }
                const cloneTicket = { ...ticket };
                // cloneTicket.chats = [newChat, ...ticket.chats]
                cloneTicket.chats.push(newChat)
                setTicket(cloneTicket)
                chatRef.current.value = "";
                // toast.success("Ticket updated")
            }
        }).catch((err) => { })
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
                <div className="mb-5">
                    <BreadCrumb path={['Profile', 'View Profile']} />
                </div>
                <div className="flex gap-5">
                    <div className="w-1/4">
                        <AccountTab />
                    </div>
                    <div className="w-4/5">

                        <div>

                            <div className="relative p-5 overflow-x-auto shadow-md sm:rounded-lg">
                                <h2 className="text-2xl font-bold mb-4">Ticket #{ticket.ticket_id}</h2>
                                <div className="mb-4">
                                    <p><strong>Title:</strong> {ticket.title}</p>
                                    <p><strong>Priority:</strong> {ticket.priority}</p>
                                    <p><strong>Status:</strong> {ticket.status}</p>
                                </div>

                                <ul className="max-h-96 overflow-auto">
                                    {
                                        ticket.chats.map((chat) => {
                                            return (
                                                <li>
                                                    <div className="mb-4 overflow-hidden">
                                                        <div className={`bg-gray-100 p-4 mb-2 rounded-md border-l-4 w-2/4 ${chat.from == TicketChatFrom.User ? "border-blue-500 float-right " : "border-green-500"}`}>
                                                            <div className="flex justify-between items-center">
                                                                <p><strong>User:</strong> {chat.from == TicketChatFrom.User ? "You " : "Admin"}</p>
                                                                <p className="text-gray-500 text-sm">{formatDateToMonthNameAndDate(chat.created_at)}</p>
                                                            </div>
                                                            <p>{chat.text}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }

                                </ul>


                                <div className="mt-4">
                                    <textarea
                                        ref={chatRef}
                                        className="w-full h-24 p-3 border border-gray-300 rounded-md"
                                        placeholder="Type your reply here..."
                                    ></textarea>
                                    <button
                                        onClick={addChat}
                                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </UserPrivateRouter>
    )
}

export default ViewTicket