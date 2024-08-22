import Link from "next/link"


function ExpressIntrestItem({ blood_group, unit, deadLine, location, full_name, chat_count }) {

    return (
        <>
            <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                {/* Blood Info */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                            {blood_group}
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-bold text-gray-800">Blood Group</h3>
                            <p className="text-gray-600 text-sm">{unit} Units Required</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h3 className="text-lg font-bold text-gray-800">Deadline</h3>
                        <p className="text-gray-600 text-sm">{deadLine}</p>
                    </div>
                </div>

                {/* Location Info */}
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="text-md font-bold text-gray-700">City Hospital</h4>
                    <p className="text-gray-600 text-sm mt-1">
                        {location}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center">

                        <button
                            type="button"
                            className=" bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600"
                        >
                            <Link href={"chat-with-donors"} className="w-full flex items-center gap-3">
                                Open chat
                                <span className="bg-white text-black text-sm font-medium me-2 px-2.5 py-0.5 rounded ">
                                    {chat_count}
                                </span>
                            </Link>
                        </button>
                        {/* <span className="ml-2 text-sm font-medium text-gray-800">You have {chat_count} messages</span> */}

                    </div>
                    <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600"
                    >
                        Already Interested
                    </button>
                </div>
            </div>
        </>
    )
}

export default ExpressIntrestItem