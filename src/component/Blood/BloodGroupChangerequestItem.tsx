import { updateBloodGroupAdmin } from "@/util/data/helper/APIHelper";
import { BloodGroupUpdateStatus } from "@/util/types/Enums/BasicEnums";
import Image from "next/image";
import { useState } from "react";
import { FaCheck, FaEye, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import DangerUIConfirm from "../Util/DangerUIConfirm";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

function BloodChangeItem({ date, name, bloodGroup, newGroup, currentStatus, certificate, req_id }) {

    const [status, setStatus] = useState<BloodGroupUpdateStatus>(currentStatus)

    function updateRequest(status: BloodGroupUpdateStatus) {
        confirmAlert({
            title: "Closing fund raiser post?",
            message: "Close",
            customUI: ({ onClose, title }) => {
                return (
                    <DangerUIConfirm title={title} onClose={onClose} onConfirm={() => {
                        updateBloodGroupAdmin(req_id, status).then((data) => {
                            if (data.status) {
                                toast.success(data.msg)
                                setStatus(status)
                            } else {
                                toast.error(data.msg)
                            }
                        }).catch((err) => {
                            toast.error("Something went wrong")
                        }).finally(() => {
                            onClose()
                        })
                    }} />
                )
            }
        })
    }


    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Blood Group Change Request</h2>
                <p className="text-gray-600 text-sm mb-4">Submitted on: {date.toLocaleString()}</p>
                <div className="mb-4">
                    <p className="text-gray-700"><span className="font-semibold">Name:</span> {name}</p>
                    <p className="text-gray-700"><span className="font-semibold">Current Blood Group:</span> {bloodGroup}</p>
                    <p className="text-gray-700"><span className="font-semibold">Requested Blood Group:</span> {newGroup}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Blood Certificate</h3>
                    <div className="p-2 w-full bg-gray-100 rounded-lg overflow-hidden">
                        <a href={certificate} className="flex justify-between items-center underline text-blue-500" target="_blank">
                            <span>View vertificate</span>
                            <button className="  bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300">
                                <FaEye />
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                {
                    status == BloodGroupUpdateStatus.Pending && (
                        <>
                            <button
                                onClick={() => {
                                    updateRequest(BloodGroupUpdateStatus.Rejected)
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 flex items-center"
                            >
                                <FaTimes className="mr-2" /> Reject
                            </button>
                            <button
                                onClick={() => {
                                    updateRequest(BloodGroupUpdateStatus.Completed)
                                }}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 flex items-center"
                            >
                                <FaCheck className="mr-2" /> Approve
                            </button>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default BloodChangeItem