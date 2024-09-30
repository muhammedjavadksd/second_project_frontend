import { FaCheck, FaDownload, FaTimes } from "react-icons/fa";

const isApproved = true;

function BloodChangeItem() {
    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Blood Group Change Request</h2>
                <p className="text-gray-600 text-sm mb-4">Submitted on: {new Date().toLocaleString()}</p>
                <div className="mb-4">
                    <p className="text-gray-700"><span className="font-semibold">Name:</span> John Doe</p>
                    <p className="text-gray-700"><span className="font-semibold">Current Blood Group:</span> A+</p>
                    <p className="text-gray-700"><span className="font-semibold">Requested Blood Group:</span> O-</p>
                    <p className="text-gray-700"><span className="font-semibold">Additional Notes:</span> Recent blood test confirms O- group</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Blood Certificate</h3>
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                            alt="Blood Certificate"
                            className="w-full h-48 object-cover"
                        />
                        <button className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300">
                            <FaDownload />
                        </button>
                    </div>
                </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                {isApproved === null ? (
                    <>
                        <button
                            onClick={() => { }}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 flex items-center"
                        >
                            <FaTimes className="mr-2" /> Reject
                        </button>
                        <button
                            onClick={() => { }}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 flex items-center"
                        >
                            <FaCheck className="mr-2" /> Approve
                        </button>
                    </>
                ) : (
                    <p className={`text-lg font-semibold ${isApproved ? 'text-green-600' : 'text-red-600'}`}>
                        {isApproved ? 'Request Approved' : 'Request Rejected'}
                    </p>
                )}
            </div>
        </div>
    )
}

export default BloodChangeItem