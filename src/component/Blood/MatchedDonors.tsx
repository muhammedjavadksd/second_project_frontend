import { adminUpdateDonorStatus } from "@/util/data/helper/APIHelper";
import { BloodDonorStatus, BloodGroup, BloodStatus } from "@/util/types/Enums/BasicEnums";
import { Fragment, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { FaEnvelope, FaInfo } from "react-icons/fa";
import { toast } from "react-toastify";
import ModelItem from "../Util/ModelItem";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { blockDonorAccountInitialValues } from "@/util/external/yup/initialValues";
import { blockDonroAccountValidation } from "@/util/external/yup/yupValidations";
import 'react-confirm-alert/src/react-confirm-alert.css';
import ModelHeader from "../Util/Model/ModelHeader";
import UpdateDonorStatus from "./DonorUpdateStatus";
import SpinnerLoader from "../Util/SpinningLoader";


function MatchedDonors({ name, bloodGroup, donorId, phoneNumber, emailAddress, status, blockedReason, distance, place }: { name: string, bloodGroup: BloodGroup, donorId: string, phoneNumber: number, emailAddress: string, status: BloodDonorStatus, blockedReason: string | null, distance?: string, place?: string }) {

    const [bloodStatus, setStatus] = useState<BloodDonorStatus>(null);
    const [reason, setReason] = useState<string>(null);
    const [isLoading, setLoader] = useState<boolean>(false);
    useEffect(() => {
        setStatus(status)
    }, [status])


    useEffect(() => {
        setReason(blockedReason)
    }, [blockedReason])

    function onUpdate() {
        UpdateDonorStatus(donorId, bloodStatus, setStatus, setReason, setLoader);
    }

    return (
        <Fragment>
            <SpinnerLoader isLoading={isLoading} />
            <div className="flex flex-col  justify-between  bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-600">
                            <span className="font-bold text-green-500">{name}</span> {bloodGroup}
                        </p>
                        <p className="text-sm text-gray-500">#{donorId}</p>
                    </div>

                    <div className="mt-4 space-y-4 animate-fade-in-down">
                        <div>
                            <ul className="space-y-2 ">
                                <li className="grid-cols-2 grid">
                                    <span>Phone number</span>
                                    <span className="text-sm text-gray-500">+91 {phoneNumber}</span>
                                </li>
                                <li className="grid-cols-2 grid">
                                    <span>Email number</span>
                                    <span className="text-sm text-gray-500 break-words">{emailAddress}</span>
                                </li>
                                <li className="grid-cols-2 grid">
                                    <span>Status</span>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-500 break-words">{bloodStatus}</span>
                                        {bloodStatus == BloodDonorStatus.Blocked && <button title={reason} type="button"><FaInfo /></button>}
                                    </div>
                                </li>
                                {
                                    distance && (
                                        <>
                                            <li className="grid-cols-2 grid">
                                                <span>Distance</span>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-500 break-words">{distance}</span>
                                                </div>
                                            </li>
                                            <li className="grid-cols-2 grid">
                                                <span>Place</span>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-500 break-words">{place}</span>
                                                </div>
                                            </li>
                                        </>)


                                }

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100  w-full p-4 flex justify-between">
                    <a
                        href={`tel:${phoneNumber}`}
                        className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        aria-label="Contact donor"
                    >
                        <FaEnvelope className="mr-2" />
                        Call {name}
                    </a>
                    <label className="inline-flex items-center cursor-pointer">
                        <input onChange={onUpdate} type="checkbox" checked={bloodStatus == BloodDonorStatus.Open} className="sr-only peer" />
                        <div className="relative w-14 h-7 bg-red-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>

                </div>
            </div>
        </Fragment>
    )
}

export default MatchedDonors