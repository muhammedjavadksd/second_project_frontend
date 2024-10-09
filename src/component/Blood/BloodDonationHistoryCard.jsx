import React, { useState } from 'react'
import DownloadButton from '../Util/downloadButton'
import { downloadCertificate } from '@/util/data/helper/utilHelper'
import SpinnerLoader from '../Util/SpinningLoader'

function BloodDonationHistoryCard({ bloodGroup, fullName, unit, date, hospitalName, certificate, patientName }) {

    const [isLoading, setLoading] = useState(false)


    return (
        <div className="bg-white p-5 rounded-lg shadow-md mb-6">
            <SpinnerLoader isLoading={isLoading} />
            <div className="mb-5 flex items-center space-x-6">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-3xl font-bold">{bloodGroup}</span>
                </div>
                <div>
                    <div className="text-gray-700 font-semibold text-lg">Blood Donated</div>
                    <p className="text-gray-500 text-sm">Recipient: <span className="font-medium text-blue-600">{fullName}</span></p>
                    <p className="text-gray-500 text-sm">Units Donated: <span className="font-medium text-blue-600">{unit}</span></p>
                    <p className="text-gray-500 text-sm">Date: <span className="font-medium text-blue-600">{date}</span></p>
                </div>
            </div>

            <div className="bg-green-100 p-4 rounded-md mb-4">
                <h5 className="text-lg font-bold text-green-700">
                    Thank you for your donation!
                </h5>
                <p className="text-gray-700 mt-2">
                    Your donation of {unit} unit(s) of {bloodGroup} blood has been successfully given to {patientName} at {hospitalName} on {date}. Your contribution is greatly appreciated.
                </p>
            </div>
            <div className="flex justify-end">
                <button onClick={() => {
                    setLoading(true)
                    downloadCertificate(certificate, "Blood donation certificate.pdf").finally(() => {
                        setLoading(false)
                    })

                }} type="button" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
                    Download Certificate
                </button>
            </div>
        </div>
    )
}

export default BloodDonationHistoryCard