import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaChrome, FaCog, FaGlobe, FaLock, FaTimes } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function AskLocation({ isLoading, isRejected }) {



    const steps = [
        { icon: FaChrome, text: "Open Chrome Browser" },
        { icon: FaCog, text: "Go to Settings" },
        { icon: FaLock, text: "Privacy and Security" },
        { icon: FaGlobe, text: "Site settings" },
        { icon: FaMapMarkerAlt, text: "Location permissions" },
        { icon: FaMapMarkerAlt, text: "Allow/Block location" },
        { icon: FaCog, text: "Manage exceptions" },
        { icon: FaCog, text: "Confirm changes" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center justify-center bg-black bg-opacity-50"
        >
            <div className="bg-white  shadow-xl max-w-md w-full">
                {isLoading && (
                    <div
                        className="flex flex-col p-5 items-center"
                        aria-live="polite"
                        role="status"
                    >
                        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500 mb-2" />
                        <p className="text-gray-600">Fetching your location...</p>
                    </div>
                )}
                <div className="p-6">


                    {
                        isRejected && (

                            <>
                                <div className="mb-6">
                                    <FaMapMarkerAlt size={48} className="text-red-500 mx-auto mb-4" />
                                    <p className="text-gray-600 text-center">
                                        We need your location to find the nearest blood donors. This helps us connect you with potential donors quickly in case of emergencies.
                                    </p>
                                </div>



                                <div className="flex flex-col space-y-3">
                                    <ol className="space-y-6">
                                        {steps.map((step, index) => (
                                            <li key={index} className="flex items-start">
                                                <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                                                    <step.icon className="h-6 w-6" />
                                                </div>
                                                <p className="ml-3 text-gray-700">
                                                    <span className="font-semibold">{index + 1}. {step.text}:</span>
                                                </p>
                                            </li>
                                        ))}
                                    </ol>

                                </div>
                            </>
                        )}
                </div>
            </div>
        </motion.div>
    )
}