import { findNameAvatar, formatDateToMonthNameAndDate } from "@/util/data/helper/utilHelper";
import Link from "next/link";
import { Fragment } from "react";
import { confirmAlert } from "react-confirm-alert";
import BloodApproveForm from "./OnBloodApproveForm";
import { toast } from "react-toastify";
import DangerUIConfirm from "../Util/DangerUIConfirm";
import { updateBloodRequest } from "@/util/data/helper/APIHelper";
import { BloodDonationStatus } from "@/util/types/Enums/BasicEnums";
import { FormActionResponse } from "@/util/types/InterFace/UtilInterface";
import ModelItem from "../Util/ModelItem";
import ModelHeader from "../Util/Model/ModelHeader";

function VerifyBloodRequestItem({ fullName, profile_id, date, message, setUpdate, donation_id, currentStatus }) {

    function onApprove() {
        confirmAlert({
            title: null,
            message: null,
            customUI: ({ onClose, title }) => {
                return (
                    <ModelItem ZIndex={99} closeOnOutSideClock={true} isOpen={true} onClose={onClose}>
                        <ModelHeader title={"Blood received confimation"} />
                        <BloodApproveForm successCb={() => { toast.success("Update success"), setUpdate((prev) => !prev), onClose() }} donation_id={donation_id} errorCb={(err) => { toast.error(err), onClose() }} />
                    </ModelItem>
                )
            }
        })
    }

    function onUpdateStatus(status: BloodDonationStatus) {
        confirmAlert({
            title: "Are you sure want to update status?",
            customUI: ({ onClose, title }) => {
                return (
                    <DangerUIConfirm
                        title={title}
                        onClose={onClose}
                        onConfirm={async () => {
                            try {
                                const update: FormActionResponse = await updateBloodRequest(status, donation_id)
                                if (update.status) {
                                    toast.success(update.msg)
                                } else {
                                    toast.error(update.msg)
                                }
                                onClose()
                            } catch (e) {
                                toast.error("Something went wrong")
                                onClose()
                            }
                        }} />
                )
            }
        })
    }


    return (
        <Fragment>
            <div className="flex flex-col p-4 bg-white shadow-inner border  rounded-md mb-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <a href="/u/divyadhakecha1?ref_project_id=38496470" className="flex gap-3 items-center">
                            <div className="bg-gray-100 rounded-full p-3">
                                {findNameAvatar(fullName)}
                            </div>
                            <div>
                                <span className="text-gray-800 font-semibold">{fullName}</span>
                                <span className="text-gray-600 text-sm block">{profile_id}</span>
                            </div>
                        </a>
                    </div>
                    <span className="text-sm text-gray-500">{formatDateToMonthNameAndDate(date)}</span>
                </div>

                <div className="mb-2">
                    <p className="text-sm text-gray-600">
                        Ready to donate their A + blood, by Augest 2023 4.30PM
                    </p>
                </div>

                {/* Bid Description */}
                <div className="mb-4">
                    <p className="text-sm text-gray-700 ">
                        {message}
                    </p>
                </div>

                {/* Action Buttons */}

                <div>
                    <button disabled={currentStatus == BloodDonationStatus.Approved} onClick={onApprove} className={`${currentStatus == BloodDonationStatus.Approved && "cursor-not-allowed"} bg-green-800 w-full text-white px-5 py-3 rounded-md text-sm`}>Blood donated</button>
                    <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => onUpdateStatus(BloodDonationStatus.NotResponded)} className={`${currentStatus == BloodDonationStatus.NotResponded && "cursor-not-allowed"} w-full bg-yellow-800 text-white px-5 py-3 rounded-md text-sm`}>Not responded</button>
                        <button onClick={() => onUpdateStatus(BloodDonationStatus.Rejected)} className={`${currentStatus == BloodDonationStatus.Rejected && "cursor-not-allowed"} w-full bg-red-800 text-white px-5 py-3 rounded-md text-sm`}>Decline Request</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default VerifyBloodRequestItem;