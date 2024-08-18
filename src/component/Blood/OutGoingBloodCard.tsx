import Link from "next/link"


function OutGoingBloodCard({ group, unit, deadLine, username, onDonateBlood, location }) {
    return (
        <div className="p-6 bg-gray-50 shadow-lg rounded-lg">

            <div className="bg-white p-5 rounded-lg shadow-md mb-6">
                <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 text-3xl font-bold">{group}</span>
                    </div>
                    <div>
                        <div className="text-gray-700 font-semibold text-lg">{group} Blood Request</div>
                        <p className="text-gray-500 text-sm">Units Needed: <span className="font-medium text-blue-600">{unit}</span></p>
                        <p className="text-gray-500 text-sm">Deadline: <span className="font-medium text-blue-600">{deadLine}</span></p>
                    </div>
                </div>
            </div>

            <div className="bg-yellow-100 p-4 rounded-md mb-4">
                <h5 className="text-lg font-bold text-yellow-800">
                    {group} Blood Request Details
                </h5>
                <p className="text-gray-700 mt-2">
                    {unit} unit(s) of {group} blood is requested. The deadline for this request is {deadLine}. Please ensure to fulfill the request by the given deadline.
                </p>
            </div>



            <Link href={"/"} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 max-w-md mx-auto flex items-center space-x-4">
                {/* Left Side: User Profile Pictures */}
                <div className="flex-shrink-0 flex space-x-[-10px]">
                    <div className="relative w-10 h-10">
                        <img
                            className="w-full h-full rounded-full border-2 border-white dark:border-gray-800 object-cover"
                            src="https://via.placeholder.com/50"
                            alt="User 1"
                        />
                    </div>
                    <div className="relative w-10 h-10">
                        <img
                            className="w-full h-full rounded-full border-2 border-white dark:border-gray-800 object-cover"
                            src="https://via.placeholder.com/50"
                            alt="User 2"
                        />
                    </div>
                    <div className="relative w-10 h-10">
                        <img
                            className="w-full h-full rounded-full border-2 border-white dark:border-gray-800 object-cover"
                            src="https://via.placeholder.com/50"
                            alt="User 3"
                        />
                    </div>
                    {/* Add more profile pictures if needed */}
                </div>

                {/* Right Side: Text Description */}
                <div className="flex-1">
                    <p className="text-gray-900 dark:text-gray-100 text-base font-semibold">
                        <span className="font-bold">John Doe</span> and 3 others have shown interest
                    </p>
                </div>
            </Link>


            <div className="flex justify-end">
                <button onClick={onDonateBlood} type="button" className="mt-5 text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
                    Close Request
                </button>

            </div>
        </div>

    )
}

export default OutGoingBloodCard