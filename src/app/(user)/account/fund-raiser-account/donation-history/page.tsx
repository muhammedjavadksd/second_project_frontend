"use client"
import FundRaiserAccountTab from "@/component/Account/AccountTab/FundRaiserAccountTab"
import Header from "@/component/Header/Header"
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter"
import BreadCrumb from "@/component/Util/BreadCrumb"
import Footer from "@/component/Util/Footer"


function FundDonationHistory() {


    return (
        <UserPrivateRouter>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Profile', 'View Profile']} />
                </div>
                <FundRaiserAccountTab />
                <div className="flex gap-5">
                    <div className="container mx-auto px-4 py-8">
                        <h2 className="text-2xl font-semibold mb-6">Donation Payment History</h2>
                        <div className="container grid grid-cols-3 gap-5 mx-auto">
                            {/* Donation Record 1 */}
                            <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-lg rounded-lg p-6">
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold text-gray-700">Date:</span>
                                    <span className="text-gray-900">2024-08-20</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold text-gray-700">Donor Name:</span>
                                    <span className="text-gray-900">John Doe</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold text-gray-700">Amount:</span>
                                    <span className="text-gray-900">₹1,000</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold text-gray-700">Blood Group:</span>
                                    <span className="text-gray-900">A+</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold text-gray-700">Payment Status:</span>
                                    <span className="font-bold text-green-600">Completed</span>
                                </div>
                                <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">Download Receipt</button>
                            </div>
                            <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-lg rounded-lg p-6">
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold text-gray-700">Date:</span>
                                    <span className="text-gray-900">2024-08-20</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold text-gray-700">Donor Name:</span>
                                    <span className="text-gray-900">John Doe</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold text-gray-700">Amount:</span>
                                    <span className="text-gray-900">₹1,000</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold text-gray-700">Blood Group:</span>
                                    <span className="text-gray-900">A+</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold text-gray-700">Payment Status:</span>
                                    <span className="font-bold text-green-600">Completed</span>
                                </div>
                                <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">Download Receipt</button>
                            </div>

                            <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-lg rounded-lg p-6">
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold text-gray-700">Date:</span>
                                    <span className="text-gray-900">2024-08-20</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold text-gray-700">Donor Name:</span>
                                    <span className="text-gray-900">John Doe</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold text-gray-700">Amount:</span>
                                    <span className="text-gray-900">₹1,000</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold text-gray-700">Blood Group:</span>
                                    <span className="text-gray-900">A+</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold text-gray-700">Payment Status:</span>
                                    <span className="font-bold text-green-600">Completed</span>
                                </div>
                                <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">Download Receipt</button>
                            </div>




                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <>
            </>
        </UserPrivateRouter>
    )
}

export default FundDonationHistory