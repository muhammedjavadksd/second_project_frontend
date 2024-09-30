import Header from "@/component/Header/Header";
import Link from "next/link";
import { Fragment } from "react";
import { FaHeart, FaShare, FaEnvelope, FaPhone } from 'react-icons/fa';

function FundRaiseClosed() {
    return (
        <Fragment>
            <Header />
            <div className="min-h-screen bg-gray-100 flex flex-col">

                <main className="flex-grow container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Oops! Donations Closed</h1>

                        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                            <div className="flex items-start mb-6">
                                <FaHeart className="h-6 w-6 text-yellow-400 mr-4 mt-1" aria-hidden="true" />
                                <div>
                                    <h2 className="text-xl font-semibold text-yellow-800 mb-2">Thank You!</h2>
                                    <p className="text-gray-600">
                                        We appreciate your support and generosity. Your contributions have made a significant impact.
                                    </p>
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Other Ways to Help:</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                                <li>Share our cause on social media</li>
                                <li>Volunteer for our upcoming events</li>
                                <li>Check out our other ongoing campaigns</li>
                            </ul>

                            <Link
                                href="view/browse"
                                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <FaShare className="mr-2" />
                                Help other&apos;s
                            </Link>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Assistance?</h2>
                            <div className="flex flex-col md:flex-row md:justify-around">
                                <a href="mailto:support@example.com" className="text-indigo-600 hover:text-indigo-500 flex items-center mb-4 md:mb-0">
                                    <FaEnvelope className="mr-2" />
                                    support@lifelink.com
                                </a>
                                <a href="tel:+1234567890" className="text-indigo-600 hover:text-indigo-500 flex items-center">
                                    <FaPhone className="mr-2" />
                                    +91 9744727684
                                </a>
                            </div>
                        </div>
                    </div>
                </main>


            </div>
        </Fragment>
    )
}

export default FundRaiseClosed