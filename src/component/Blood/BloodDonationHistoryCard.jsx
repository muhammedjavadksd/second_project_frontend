import React from 'react'
import DownloadButton from '../Util/downloadButton'

function BloodDonationHistoryCard() {
    return (
        <div className="bg-white p-5 rounded-lg shadow-md mb-6">
            <div className="mb-5 flex items-center space-x-6">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-3xl font-bold">A+</span>
                </div>
                <div>
                    <div className="text-gray-700 font-semibold text-lg">Blood Donated</div>
                    <p className="text-gray-500 text-sm">Recipient: <span className="font-medium text-blue-600">Muahmmed Javad</span></p>
                    <p className="text-gray-500 text-sm">Location: <span className="font-medium text-blue-600">Kasaragod</span></p>
                    <p className="text-gray-500 text-sm">Units Donated: <span className="font-medium text-blue-600">2</span></p>
                    <p className="text-gray-500 text-sm">Date: <span className="font-medium text-blue-600">12/09/2023</span></p>
                </div>
            </div>

            <div className="bg-green-100 p-4 rounded-md mb-4">
                <h5 className="text-lg font-bold text-green-700">
                    Thank you for your donation!
                </h5>
                <p className="text-gray-700 mt-2">
                    Your donation of 2 unit(s) of A+ blood has been successfully given to Muahmmed Javad at Kasaragod on 12/09/2023. Your contribution is greatly appreciated.
                </p>
            </div>
            <div className="flex justify-end">
                <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
                    Download Certificate
                </button>
            </div>
        </div>
    )
}

export default BloodDonationHistoryCard