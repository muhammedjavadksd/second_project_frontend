"use client"
import Header from "@/component/Header/Header";
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter";
import BreadCrumb from "@/component/Util/BreadCrumb";
import AccountTab from '@/component/Account/AccountTab/ProfileTab'
import Link from "next/link";
import Footer from "@/component/Util/Footer";

function ViewTicket() {


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
                                <h2 className="text-2xl font-bold mb-4">Ticket #Ticket ID</h2>
                                <div className="mb-4">
                                    <p><strong>Title:</strong> Subscribe my channe;</p>
                                    <p><strong>Description:</strong> Description</p>
                                    <p><strong>Priority:</strong> Medium</p>
                                    <p><strong>Status:</strong> Active</p>
                                </div>

                                <div className="mb-4">

                                    <div className="bg-gray-100 p-4 mb-2 rounded-md border-l-4 border-blue-500">
                                        <p><strong>User:</strong> Sample</p>
                                        <p className="text-gray-500 text-sm">May 2nd</p>
                                    </div>

                                </div>

                                <div className="mt-4">
                                    <textarea
                                        value={""}
                                        className="w-full h-24 p-3 border border-gray-300 rounded-md"
                                        placeholder="Type your reply here..."
                                    ></textarea>
                                    <button
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