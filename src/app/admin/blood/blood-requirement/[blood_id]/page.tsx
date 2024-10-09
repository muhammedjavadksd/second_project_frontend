"use client"
import AdminLayout from "@/component/Admin/AdminLayout"
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter"
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb"
import { Fragment, useEffect, useState } from "react"
import { FaCalendar, FaEnvelope, FaHistory, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa"
import { BiDonateBlood } from "react-icons/bi";
import BloodIntrestCard from "@/component/Blood/AdminBloodIntrestCard"
import MatchedDonors from "@/component/Blood/MatchedDonors"
import LoadingDataNotFoundComponent from "@/component/Util/LoadingDataNotFound"
import IBloodReq, { IBloodDonor } from "@/util/types/API Response/Blood"
import { adminBloodVerify, closeBloodRequestFromAdmin, findBloodResponse, findMatchedBlood, findSingleBloodrequirement } from "@/util/data/helper/APIHelper"
import { useParams } from "next/navigation"
import PaginationSection from "@/component/Util/PaginationSection"
import { IBloodDonate, IShowedIntrest } from "@/util/types/InterFace/UtilInterface"
import EmptyScreen from "@/component/Util/EmptyScreen"
import { BloodDonationStatus, BloodGroup, BloodStatus } from "@/util/types/Enums/BasicEnums"
import { messageFromBloodConcernce } from "@/util/data/helper/utilHelper"
import { confirmAlert } from "react-confirm-alert"
import DangerUIConfirm from "@/component/Util/DangerUIConfirm"
import { toast } from "react-toastify"
import 'react-confirm-alert/src/react-confirm-alert.css';



function Page() {

    const [isLoading, setLoading] = useState<boolean>(true)
    const [isDeadlinenearst, setNearest] = useState<boolean>(false)
    const [isCrossed, setCrossed] = useState<boolean>(false)
    const [requirement, setRequirement] = useState<IBloodReq>(null)
    const [isClosed, setClose] = useState<boolean>(false)
    const [status, setStatus] = useState<BloodStatus>(null)
    const [closedExaplnataion, setClosingExplanation] = useState<Record<string, any>>({ category: null, explanation: "" })
    const { blood_id } = useParams();


    function verifyRequest(status: BloodStatus) {
        confirmAlert({
            title: "Are you sure want to verify this request?",
            message: "Verify requirement",
            customUI: ({ onClose, title }) => {
                return <DangerUIConfirm onClose={onClose} onConfirm={() => {
                    adminBloodVerify(status, blood_id.toString()).then((response) => {
                        response.status ? toast.success(response.msg) : toast.error(response.msg);
                    }).finally(() => {
                        setStatus(status)
                    })
                }} title={title}></DangerUIConfirm>
            }
        })
    }


    function onClose() {
        confirmAlert({
            title: "Are you sure want to close this requirement?",
            message: "Close requirement",
            customUI: ({ onClose, title }) => {
                return <DangerUIConfirm onClose={onClose} onConfirm={() => {
                    closeBloodRequestFromAdmin(blood_id.toString()).then((data) => {
                        if (data) {
                            setClose(true)
                            toast.success("This blood requirement has been closed")
                            setClosingExplanation({ category: "Admin close request", explanation: "" })
                        }
                    }).catch((err) => { })
                    onClose()
                }} title={title}></DangerUIConfirm>
            }
        })
    }

    function findReq() {
        setLoading(true)
        findSingleBloodrequirement(blood_id.toString()).then((profile: IBloodReq) => {

            console.log(profile);

            setRequirement(profile)
            setLoading(false)
            setClose(profile.is_closed || false)
            setClosingExplanation({ category: profile.close_details?.category, explanation: profile.close_details?.explanation || "" })
            setClose(profile.is_closed || false)

            const now = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(now.getDate() + 1);
            tomorrow.setHours(23, 59, 59, 999);

            if (profile.neededAt < now) {
                setCrossed(true)
            } else if (profile.neededAt <= tomorrow) {
                setNearest(true)
            }
        }).catch((err) => {
            setLoading(false)
        })
    }

    useEffect(() => {
        findReq()
    }, [blood_id])

    const today: number = new Date().getMilliseconds()


    return (
        <Fragment>
            <AdminPrivateRouter>
                <AdminLayout>
                    <div className="flex justify-between">
                        <div>
                            <AdminBreadCrumb title={"Blood requirement"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Blood requirement", href: "/blood/blood-reuirement" }]} />
                        </div>
                        <div className='buttonGroups flex items-center justify-end gap-3'>
                            {(!isClosed && status != BloodStatus.Approved) && <button onClick={() => verifyRequest(BloodStatus.Approved)} className='bg-green-700 text-sm text-white p-2 rounded-lg pl-5 pr-5'> Verify Case </button>}
                            {!isClosed && <button onClick={onClose} className='bg-red-700 text-sm text-white p-2 rounded-lg pl-5 pr-5'> Close the case </button>}
                        </div>
                    </div>
                    {
                        (isClosed) && (
                            <div className="bg-red-500 p-3 mt-3 text-white rounded-md">
                                This blood requirement has been closed because of {closedExaplnataion?.category} - {closedExaplnataion?.explanation}
                            </div>
                        )
                    }
                    {
                        (isCrossed && !requirement?.is_closed) && (
                            <div className="bg-red-500 p-3 mt-3 text-white rounded-md">
                                This requirement&apos;s deadline has already passed. Please contact us as soon as possible.
                            </div>
                        )
                    }
                    <div className="min-h-screen grid">
                        <LoadingDataNotFoundComponent isFound={!!requirement} isLoading={isLoading} >
                            {requirement && <div className="bg-white shadow-lg mt-4 rounded-lg overflow-hidden mb-8">
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Requirement Information</h2>
                                    <div className="grid  grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                                            <div className="mt-1 flex items-center">
                                                <BiDonateBlood className="h-5 w-5 text-red-500 mr-2" />
                                                <span className="text-lg font-semibold">{requirement.blood_group}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Quantity Required</label>
                                            <span className="text-lg font-semibold">{requirement.unit} units</span>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Location for Donation</label>
                                            <div className="mt-1 flex items-center">
                                                <FaMapMarkerAlt className="h-5 w-5 text-gray-400 mr-2" />
                                                <span>{requirement.locatedAt.hospital_name}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Contact Information</label>
                                            <div className="mt-1 flex items-center">
                                                <FaPhone className="h-5 w-5 text-gray-400 mr-2" />
                                                <span>{requirement.phoneNumber}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email Information</label>
                                            <div className="mt-1 flex items-center">
                                                <FaEnvelope className="h-5 w-5 text-gray-400 mr-2" />
                                                <span>{requirement.email}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Created by </label>
                                            <div className="mt-1 flex items-center">
                                                <FaUser className="h-5 w-5 text-gray-400 mr-2" />
                                                <span>{requirement.relationship}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Patient name</label>
                                            <div className="mt-1 flex items-center">
                                                <FaUser className="h-5 w-5 text-gray-400 mr-2" />
                                                <span>{requirement.patientName}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Deadline</label>
                                            <div className="mt-1 flex items-center">
                                                <FaCalendar className="h-5 w-5 text-gray-400 mr-2" />
                                                <span>{new Date(requirement.neededAt).toDateString()}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Status</label>
                                            <div className="mt-1 flex items-center">
                                                <FaCalendar className="h-5 w-5 text-gray-400 mr-2" />
                                                <span>{status}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        isDeadlinenearst && <div className="mt-6">
                                            <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
                                            <p className="mt-1 text-sm text-gray-600">Urgent requirement. Please contact as soon as possible. Donation needed within 24 hours.</p>
                                        </div>
                                    }
                                </div>
                            </div>}

                            <div className="mb-5">
                                <PaginationSection
                                    api={{
                                        renderType: (page: number, limit: number) => {
                                            return findBloodResponse(blood_id.toString(), page, limit)
                                        }
                                    }}
                                    itemsRender={(items: IBloodDonate[]) => {
                                        return (
                                            <>
                                                <h3 className='text-2xl mb-3 '>Showen Intrest</h3>
                                                {
                                                    items.length ? < div className="grid  gap-4 grid-cols-3">
                                                        {
                                                            items.map((each, index) => {
                                                                return (
                                                                    <BloodIntrestCard key={index} bloodGroup={each.requirement.blood_group} concernc={messageFromBloodConcernce(each.requirement.patientName, each.concerns, each.meet_expect.toString(), each.requirement.locatedAt.hospital_name)} donationId={each.donation_id} donorName={each.donor_profile?.full_name} meetExpect={new Date(each.meet_expect).toDateString()} phone_number={each.donor_profile?.phoneNumber + ""} status={each.status as BloodDonationStatus} />
                                                                )
                                                            })
                                                        }
                                                    </div > : <EmptyScreen msg="No intrest on this request" />
                                                }
                                            </>
                                        )
                                    }}
                                    paginationProps={{ current_page: 1, currentLimit: 8 }}
                                    refresh={null}
                                />
                            </div>
                            <div className="mt-4">
                                <PaginationSection
                                    api={{
                                        renderType: (page: number, limit: number) => {
                                            return findMatchedBlood(requirement.blood_group, limit, page);
                                        },
                                    }}
                                    itemsRender={(donors: IBloodDonor[]) => {
                                        return donors.length ? (
                                            <>
                                                <h3 className='text-2xl mb-3 '>Matched Donors</h3>
                                                <div className="grid  gap-4 grid-cols-3">
                                                    {
                                                        donors.map((items) => {
                                                            return (
                                                                <>
                                                                    <MatchedDonors blockedReason={items.blocked_reason} status={items.status} bloodGroup={items.blood_group as BloodGroup} donorId={items.donor_id} emailAddress={items.donor_id} phoneNumber={items.phoneNumber} name={items.full_name} />
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </>
                                        ) : <EmptyScreen msg="No matched donors found" />
                                    }}
                                    paginationProps={{ current_page: 1, currentLimit: 6 }}
                                    refresh={null}
                                />
                                {/* 
                                <MatchedDonors />
                                <MatchedDonors />
                            </div> */}
                            </div>
                        </LoadingDataNotFoundComponent>
                    </div>
                </AdminLayout>
            </AdminPrivateRouter>
        </Fragment >
    )

}

export default Page