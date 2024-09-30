import Link from "next/link"
import { confirmAlert } from "react-confirm-alert"
import ModelHeader from "../Util/Model/ModelHeader"
import OnCloseForm from "./onCloseForm"


function OutGoingBloodCard({ blood_id, group, unit, deadLine, closed, closed_reason, intrest_submission, onCloseRequest }) {

    function onClose() {
        confirmAlert({
            title: "Are you sure want to close this?",
            message: "Want to close?",
            customUI: ({ onClose, title, }) => {
                return (
                    <OnCloseForm blood_id={blood_id} onSuccess={() => {
                        onClose()
                        onCloseRequest()
                    }} onClose={onClose} />
                )
            }
        })
    }

    return (
        <div className={`p-6 g mb-5 bg-gray-50 shadow-lg rounded-lg ${closed && "bg-red-100 shadow-none"}`}>


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

                {/* Right Side: Text Description */}
                <div className="flex
                
                -1">
                    <p className="text-gray-900 dark:text-gray-100 text-base font-semibold">
                        {
                            closed ? (
                                closed && <p className="text-red-500 text-sm">This request was closed becuase <strong>{closed_reason}</strong></p>
                            ) : intrest_submission?.length ? (
                                <p>{intrest_submission.length}  others have shown interest</p>
                            ) : <p>We are finding for the donor&apos;s</p>
                        }
                    </p>
                </div>
            </Link>


            <div className="flex gap-5 justify-end">
                {
                    !closed && <button onClick={onClose} type="button" className="mt-5 text-white bg-red-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
                        Close Request
                    </button>
                }
                <Link href={`/account/blood-account/verify-request/${blood_id}`} type="button" className="mt-5 text-white bg-green-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
                    View Intrest
                </Link>

            </div>
        </div>

    )
}

export default OutGoingBloodCard