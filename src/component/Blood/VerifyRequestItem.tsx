import Link from "next/link";
import { Fragment } from "react";

function VerifyBloodRequestItem() {

    return (
        <Fragment>
            <div className="flex flex-col p-4 bg-gray-100  rounded-md mb-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <a href="/u/divyadhakecha1?ref_project_id=38496470" className="flex items-center">
                            <img
                                src="https://cdn2.f-cdn.com/ppic/224842181/logo/14133910/profile_logo_14133910.jpg?image-optimizer=force&format=webply&width=120"
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full mr-3"
                            />
                            <div>
                                <span className="text-gray-800 font-semibold">Dayaben D.</span>
                                <span className="text-gray-600 text-sm block">@divyadhakecha1</span>
                            </div>
                        </a>
                    </div>
                    <span className="text-sm text-gray-500">2 days ago</span>
                </div>

                {/* Bid Details */}
                <div className="mb-2">
                    <p className="text-sm text-gray-600">
                        Ready to donate their A + blood, by Augest 2023 4.30PM
                    </p>
                </div>

                {/* Bid Description */}
                <div className="mb-4">
                    <p className="text-sm text-gray-700 ">
                        Hi Muhammed Javad, Please consider that I have the following concerns: I have serious conditions such as Hepatitis B or C. I would like to donate my blood to you. I'll come to Arimala by 2024-08-23T11:38:38.371Z.Please let me know if there’s anything else I should be aware of.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-5">
                    <button className="bg-green-600 text-white p-3 rounded-lg">Blood donated</button>
                    <button className="bg-yellow-600 text-white p-3 rounded-lg">Not responded</button>
                </div>
            </div>
        </Fragment>
        // <div className="p-6 mb-5 bg-gray-50 shadow-lg rounded-lg">
        //     <div className="bg-white p-5 rounded-lg shadow-md mb-6">
        //         <div className="flex items-center space-x-6">
        //             <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
        //                 <span className="text-red-600 text-3xl font-bold">A+</span>
        //             </div>
        //             <div>
        //                 <div className="text-gray-700 font-semibold text-lg">A+ Blood Request</div>
        //                 <p className="text-gray-500 text-sm">Units Needed: <span className="font-medium text-blue-600">2</span></p>
        //                 <p className="text-gray-500 text-sm">Deadline: <span className="font-medium text-blue-600">20/2023</span></p>
        //             </div>
        //         </div>
        //     </div>

        //     <div className="bg-yellow-100 p-4 rounded-md mb-4">
        //         <h5 className="text-lg font-bold text-yellow-800">A+ Blood Request Details</h5>
        //         <p className="text-gray-700 mt-2">
        //             2 unit(s) of A+ blood is requested. The deadline for this request is 20/2023. Please ensure to fulfill the request by the given deadline.
        //         </p>
        //     </div>

        //     <div className="relative">
        //         <select className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
        //             <option value="">Blood donated</option>
        //             <option value="">Not responded</option>
        //             <option value="">Requirement not matched</option>
        //         </select>
        //         <button className="bg-gray-200 mt-2 text-gray-700 px-4 py-2 rounded-md w-full hover:bg-gray-300">
        //             Update Status
        //         </button>

        //     </div>

        // </div>

    )
}

export default VerifyBloodRequestItem;