import React, { useState, useEffect } from "react";
import { FaSpinner, FaExclamationTriangle, FaSync } from "react-icons/fa";

const LoadingDataNotFoundComponent = ({ children, isLoading, isFound }: { children: React.ReactNode, isLoading: boolean, isFound: boolean }) => {

    const [loading, setLoading] = useState(isLoading);

    useEffect(() => {
        setLoading(isLoading)
    }, [isLoading])


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Loading...</h2>
                <p className="text-gray-500">Please wait while we fetch the data.</p>
            </div>
        );
    }


    if (!isFound) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <FaExclamationTriangle className="text-5xl text-yellow-500 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Oops! No data found</h2>
                <p className="text-gray-500 mb-4">We couldn&apos;t find the data you&apos;re looking for.</p>
            </div>
        );
    }

    return children
};

export default LoadingDataNotFoundComponent;