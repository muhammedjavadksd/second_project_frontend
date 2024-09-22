"use client"
import AdminLayout from "@/component/Admin/AdminLayout"
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter"
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb"
import { Fragment, useEffect, useRef, useState } from "react"
import { FaPaperclip, FaSpinner } from "react-icons/fa";
import { IoSend } from "react-icons/io5";


function Page() {
    const [reply, setReply] = useState("");
    const [error, setError] = useState("");
    const [messages, setMessages] = useState([
        { id: 1, sender: "User", content: "Hello, I have an issue with my order.", timestamp: "2023-06-10T10:30:00Z" },
        { id: 2, sender: "Support", content: "Hi there! I'd be happy to help. Can you please provide more details about your order?", timestamp: "2023-06-10T10:35:00Z" },
        { id: 3, sender: "User", content: "Sure, my order number is #12345 and I haven't received it yet.", timestamp: "2023-06-10T10:40:00Z" },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const handleReplyChange = (e) => {
        setReply(e.target.value);
        setError("");
    };

    const handleSendReply = () => {
        if (reply.trim() === "") {
            setError("Please enter a message.");
            return;
        }
        if (reply.length > 500) {
            setError("Message cannot exceed 500 characters.");
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            const newMessage = {
                id: messages.length + 1,
                sender: "User",
                content: reply,
                timestamp: new Date().toISOString(),
            };
            setMessages([...messages, newMessage]);
            setReply("");
            setIsLoading(false);
        }, 1000);
    };

    return (
        <Fragment>
            <AdminPrivateRouter>
                <AdminLayout>
                    <AdminBreadCrumb title={"Ticket of Muhammed Javad"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Manage tickets", href: "" }]} />


                    <div className="max-full mx-auto  min-h-screen">
                        <div className="bg-white mt-2 rounded-lg shadow-md p-6 mb-6">
                            <h1 className="text-2xl font-bold mb-2">Ticket #54321</h1>
                            <p className="text-gray-600 mb-1">Status: <span className="font-semibold text-green-600">Open</span></p>
                            <p className="text-gray-600">Created: June 10, 2023 at 10:30 AM</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <div
                                ref={chatRef}
                                className="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-md"
                                aria-label="Chat history"
                            >
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`mb-4 ${message.sender === "User" ? "text-right" : "text-left"}`}
                                    >
                                        <div
                                            className={`inline-block p-3 rounded-lg ${message.sender === "User" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                                        >
                                            <p className="font-semibold">{message.sender}</p>
                                            <p>{message.content}</p>
                                            <p className="text-xs mt-1 opacity-75">
                                                {new Date(message.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="relative">
                                <textarea
                                    className={`w-full p-3 pr-12 rounded-md border ${error ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    rows={1}
                                    placeholder="Type your reply here..."
                                    value={reply}
                                    onChange={handleReplyChange}
                                    aria-label="Reply input"
                                ></textarea>

                                <div className="absolute right-2 bottom-2 flex">
                                    <button
                                        className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 mr-2"
                                        onClick={() => { }}
                                        aria-label="Attach file"
                                    >
                                        <FaPaperclip />
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                        onClick={handleSendReply}
                                        disabled={isLoading}
                                        aria-label="Send reply"
                                    >
                                        {isLoading ? <FaSpinner className="animate-spin" /> : <IoSend />}
                                    </button>
                                </div>
                            </div>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </div>
                    </div>

                </AdminLayout>
            </AdminPrivateRouter>
        </Fragment>
    )
}

export default Page