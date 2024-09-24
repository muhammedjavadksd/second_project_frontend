"use client"
import AdminLayout from "@/component/Admin/AdminLayout"
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter"
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb"
import LoadingDataNotFoundComponent from "@/component/Util/LoadingDataNotFound"
import { addReplayToTicket, getSingleTicket } from "@/util/data/helper/APIHelper"
import { ITicketChat, ProfileTicket, ProfileTicketPopoulated } from "@/util/types/API Response/Profile"
import { TicketChatFrom } from "@/util/types/Enums/BasicEnums"
import { setNestedObjectValues } from "formik"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import { FaPaperclip, FaSpinner } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify"


function Page() {
    const [reply, setReply] = useState("");
    const ref = useRef(null)

    const [isLoading, setIsLoading] = useState(false);
    const { ticket_id } = useParams();

    const [ticketChats, setChats] = useState<ITicketChat[]>([])
    const [baseTicket, setTicket] = useState<ProfileTicketPopoulated>(null)
    const [selectedFile, setFile] = useState<File | null>(null)

    const chatRef = useRef(null);



    useEffect(() => {
        getSingleTicket(ticket_id.toString()).then((ticket) => {
            if (ticket) {
                setTicket(ticket)
                setChats(ticket.chats)
            }
        })
    }, [])

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, []);

    const handleReplyChange = (e) => {
        setReply(e.target.value);
    };

    const handleSendReply = () => {
        if (reply.trim() === "") {
            toast.error("Please enter a message.");
            return;
        }
        if (reply.length > 500) {
            toast.error("Message cannot exceed 500 characters.");
            return;
        }
        setIsLoading(true);
        addReplayToTicket(ticket_id.toString(), reply, TicketChatFrom.Admin, selectedFile).then((data) => {
            if (data) {
                setChats((prev) => {
                    const newMessage: ITicketChat = {
                        attachment: typeof data == "string" && data,
                        chat_id: null,
                        created_at: new Date(),
                        from: TicketChatFrom.Admin,
                        text: reply
                    };
                    return [...prev, newMessage]
                });
                setReply("");
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
            setFile(null)
        }).catch((err) => {
            setFile(null)
            setIsLoading(false);
        })
    };



    return (
        <Fragment>
            <AdminPrivateRouter>
                <AdminLayout onSearch={() => { }}>
                    {/* <AdminBreadCrumb title={`Ticket of ${baseTicket?.profile.first_name} ${baseTicket?.profile.last_name} `} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Manage tickets", href: "" }]} /> */}

                    <LoadingDataNotFoundComponent isLoading={!(!!baseTicket) || isLoading} isFound={!!baseTicket} >
                        <div className="max-full mx-auto  min-h-screen">
                            <div className="bg-white mt-2 rounded-lg shadow-md p-6 mb-6">
                                <h1 className="text-2xl font-bold mb-2">Ticket {ticket_id}</h1>
                                <h1 className="text-2xl font-bold mb-2">Title : {baseTicket?.title}</h1>
                                <p className="text-gray-600 mb-1">Status: <span className="font-semibold text-green-600">{baseTicket?.status}</span></p>
                                <p className="text-gray-600">Created: {new Date(baseTicket?.created_at).toDateString()}</p>
                                <p className="text-gray-600">Last update: {new Date(baseTicket?.updated_at).toDateString()}</p>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <div
                                    ref={chatRef}
                                    className="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-md"
                                    aria-label="Chat history"
                                >
                                    {ticketChats && ticketChats.map((message) => (
                                        <div
                                            key={message.chat_id}
                                            className={`mb-4 ${message.from === TicketChatFrom.Admin ? "text-right" : "text-left"}`}
                                        >
                                            <div
                                                className={`inline-block p-3 rounded-lg ${message.from === TicketChatFrom.User ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                                            >
                                                <p className="font-semibold">{message.from}</p>
                                                <p>{message.text}</p>
                                                {message.attachment && <a className={`mt-2 mb-3 block underline ${message.from == TicketChatFrom.User ? `text-white` : 'text-blue-600'} `} target="_blank" href={message.attachment}>View attachment</a>}
                                                <p className="text-xs mt-1 opacity-75">
                                                    {new Date(message.created_at).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {
                                    selectedFile && <div className="imageLabel bg-blue-400 p-2 text-white gap-3 flex items-center rounded-ss-lg rounded-se-lg">
                                        <div className="flex justify-between w-full">
                                            <div className="flex gap-2 items-center">
                                                <i className="fa-solid fa-image"></i>
                                                <span>{selectedFile?.name}</span>
                                            </div>
                                            <button onClick={() => setFile(null)} className="">
                                                <i className="fa-solid text-red-900 fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                }
                                <div className="relative flex items-center">
                                    <textarea
                                        className={`w-full p-3 pr-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedFile ? 'rounded-ss-none rounded-se-none rounded-es-lg rounded-ee-lg' : "rounded-md"}`}
                                        rows={1}
                                        placeholder="Type your reply here..."
                                        value={reply}
                                        onChange={handleReplyChange}
                                        aria-label="Reply input"
                                    ></textarea>

                                    <div className="absolute right-2 bottom-2 flex">
                                        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={ref} className="hidden" />
                                        <button
                                            className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 mr-2"
                                            onClick={() => {
                                                ref.current?.click()
                                            }}
                                            aria-label="Attach file"

                                        >
                                            <FaPaperclip />
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                            onClick={handleSendReply}
                                            aria-label="Send reply"
                                        >
                                            <IoSend />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </LoadingDataNotFoundComponent>
                    <>
                    </>
                </AdminLayout>
            </AdminPrivateRouter>
        </Fragment>
    )
}

export default Page