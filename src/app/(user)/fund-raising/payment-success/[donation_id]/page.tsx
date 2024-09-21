"use client"
import React, { Fragment, useEffect, useState } from 'react';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Header from '@/component/Header/Header';
import { findOrder } from '@/util/data/helper/APIHelper';
import { useParams, useRouter } from 'next/navigation';
import { date } from 'yup';
import { PaymentOrderResponse } from '@/util/types/API Response/FundRaiser';
import { formatDateToMonthNameAndDate } from '@/util/data/helper/utilHelper';
import LoadingComponent from '@/component/Util/LoadingComponent';
import const_data from '@/util/data/const';

const PaymentSuccessPage = () => {

    const [tokenDetails, setDonation] = useState<PaymentOrderResponse>(null);
    const router = useRouter()

    const { donation_id } = useParams()

    function findProfile() {
        findOrder(donation_id.toString()).then((profile) => {
            console.log(profile);
            setDonation(profile)
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        const intervel = setInterval(() => {
            if (!tokenDetails) {
                findProfile()
            } else {
                clearInterval(intervel)
            }
        }, 3000)
    }, []);

    return (
        <Fragment>
            <Header />
            <LoadingComponent closeOnClick={false} isLoading={!(!!tokenDetails)} paddingNeed={false}>
                <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
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
                                <FaCheckCircle className="text-green-500 text-6xl mb-4" aria-hidden="true" />
                            </motion.div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Donation Successful!</h1>
                            <p className="text-gray-600 mb-6">Thank you for your donation. Your transaction has been completed successfully.</p>
                        </div>

                        <div className="bg-gray-50 rounded-md p-4 mb-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">Transaction Details</h2>
                            <ul className="space-y-2">
                                <li className="flex justify-between">
                                    <span className="text-gray-600">Donation ID:</span>
                                    <span className="font-medium">{tokenDetails && tokenDetails.donation_id}</span>
                                </li>
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
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                onClick={() =>
                                    router.push("/account/fund-raiser-account/donation-history")
                                }
                            >
                                <span className="mr-2">View donation history</span>
                                <FaArrowRight aria-hidden="true" />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </LoadingComponent>
        </Fragment>
    );
};

export default PaymentSuccessPage;