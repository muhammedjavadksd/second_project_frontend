import React from 'react'

function BloodCard({ group, unit, deadLine, username, onDonateBlood, location }): React.ReactElement {
    return (
        <div className="p-6 bg-gray-50 shadow-lg rounded-lg">

            <div className="flex justify-between bg-white p-4 rounded-lg  mb-6 space-x-4">
                <div className="flex-1 text-center">
                    <div className="text-red-600 font-bold text-xl">{group}</div>
                    <span className="text-gray-500 text-xs">Blood Group</span>
                </div>
                <div className="flex-1 text-center">
                    <div className="text-blue-600 font-bold text-lg">{unit} Unit</div>
                    <span className="text-gray-500 text-xs">Units Required</span>
                </div>
                <div className="flex-1 text-center">
                    <div className="text-blue-600 font-bold text-lg">{deadLine}</div>
                    <span className="text-gray-500 text-xs">Deadline</span>
                </div>
            </div>




            <div className="bg-red-100 p-4 rounded-md mb-4">
                <h5 className="text-lg font-bold text-red-700">
                    {group} Blood Urgently Needed at {location}
                </h5>
                <p className="text-gray-700 mt-2">
                    {unit} unit(s) of {group} blood is urgently required. The deadline for donation is {deadLine}. Location: {location}.
                </p>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">{username}</span>
                </div>
                <button onClick={onDonateBlood} type="button" className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
                    Donate Now
                </button>
            </div>
        </div>

    )
}

export default BloodCard