"use client"
import { useParams } from "next/navigation"
import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaExclamationTriangle, FaLock } from "react-icons/fa";
import Link from "next/link";
import { adminTokenVerify } from "@/util/data/helper/APIHelper";
import SpinnerLoader from "@/component/Util/SpinningLoader";

function VerifyToken() {

    const { token } = useParams();

    const [isVisible, setIsVisible] = useState(false);
    const [isVerified, setVerification] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);





    useEffect(() => {
        setIsVisible(true);
        adminTokenVerify(token.toString()).then((response) => {
            setVerification(response.status)
        }).catch((e) => {
            setVerification(false)
        }).finally(() => {
            setLoading(false)
        })
    }, [token]);

    if (isLoading) {
        return <div>
            <SpinnerLoader isLoading={true} />
        </div>
    }


    return (
        <Fragment>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
                >
                    {isVerified ? (
                        <div className="text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            >
                                <FaCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
                            </motion.div>
                            <h1 className="text-2xl font-bold mb-4">Email Update Successful</h1>
                            <p className="text-gray-600 mb-6">
                                Your email ID has been successfully updated after token verification.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                                aria-label="Return to dashboard"
                            >
                                <Link href={"/admin"}>Return to Dashboard</Link>
                            </motion.button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            >
                                <FaExclamationTriangle className="text-red-500 text-6xl mb-4 mx-auto" />
                            </motion.div>
                            <h1 className="text-2xl font-bold mb-4">Email Update Failed</h1>
                            <p className="text-gray-600 mb-6">Something went wrong</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                                aria-label="Try again"
                            >
                                Try Again
                            </motion.button>
                        </div>
                    )}
                </motion.div>

            </div>
        </Fragment >
    )
}

export default VerifyToken