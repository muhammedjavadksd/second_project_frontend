import { Fragment } from "react";
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { PaymentOrderResponse } from "@/util/types/API Response/FundRaiser";
import { formatDateToMonthNameAndDate } from "@/util/data/helper/utilHelper";
import const_data from "@/util/data/const";
import { useRouter } from "next/navigation";
import { IoIosCloseCircle } from "react-icons/io";


function DonationFailed({ tokenDetails }: { tokenDetails: Partial<PaymentOrderResponse> }) {

    const router = useRouter()


    return (
        <Fragment>
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"
                >
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 500, damping: 30 }}
                            className="inline-block"
                        >
                            <IoIosCloseCircle className="text-red-500 text-6xl mb-4" aria-hidden="true" />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment failed!</h1>
                        <p className="text-red-600 mb-6">Payment unsuccessful. If any amount was debited, it will be refunded within 2 days.</p>
                    </div>

                    <div className="bg-gray-50 rounded-md p-4 mb-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">Transaction Details</h2>
                        <ul className="space-y-2">
                            {/* {tokenDetails.stat} */}

                            <li className="flex justify-between">
                                <span className="text-gray-600">Amount:</span>
                                <span className="font-medium">{tokenDetails && tokenDetails.amount}{const_data.MONEY_ICON}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-gray-600">Date:</span>
                                <span className="font-medium">{tokenDetails && formatDateToMonthNameAndDate(tokenDetails.date)}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-gray-600">Fund Raiser </span>
                                <span className="font-medium">{tokenDetails && tokenDetails.fund_id}</span>
                            </li>
                        </ul>
                    </div>

                    <div className="text-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            onClick={() =>
                                router.push(`/fund-raising/view/${tokenDetails.fund_id}`)
                            }
                        >
                            <span className="mr-2">Retry payment</span>
                            <FaArrowRight aria-hidden="true" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </Fragment>
    )
}

export default DonationFailed