import { Fragment } from "react";
import { FaEnvelope } from "react-icons/fa";


function MatchedDonors() {

    return (
        <Fragment>
            <div className=" bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-600">
                            <span className="font-bold text-green-500">Muhammed Javad</span> A+
                        </p>
                        <p className="text-sm text-gray-500">#BSSIIHW</p>
                    </div>

                    <div className="mt-4 space-y-4 animate-fade-in-down">
                        <div>
                            <ul className="space-y-2">
                                <li className="flex justify-between items-center">
                                    <span>Phone number</span>
                                    <span className="text-sm text-gray-500">+91 9744727684</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span>Email number</span>
                                    <span className="text-sm text-gray-500">muhammed@gmail.com</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span>Location</span>
                                    <span className="text-sm text-gray-500">Kochi, Kerala</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 flex justify-around">
                    <button
                        className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        aria-label="Contact donor"
                    >
                        <FaEnvelope className="mr-2" />
                        Call Javad
                    </button>

                </div>
            </div>
        </Fragment>
    )
}

export default MatchedDonors