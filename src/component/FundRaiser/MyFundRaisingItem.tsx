import const_data from '@/util/data/const'
import { formatDateToMonthNameAndDate } from '@/util/data/helper/utilHelper'
import React from 'react'
import LoadImage from '../Util/ImageLoading'
import { FundRaiserResponse } from '@/util/types/API Response/FundRaiser'
import { closeFundRaise } from '@/util/data/helper/APIHelper'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import DangerUIConfirm from '../Util/DangerUIConfirm'
import { FundRaiserStatus } from '@/util/types/Enums/BasicEnums'

function MyFundRaisingItem({ profile }: { profile: FundRaiserResponse }) {

    console.log(profile);
    const collectedPercentage = (+profile.collected) / (profile.amount) * 100

    function close() {
        confirmAlert({
            title: "Are you sure want to close the post?",
            message: "close the post?",

            customUI: ({ onClose, title }) => {
                return (
                    <DangerUIConfirm
                        onClose={onClose}
                        onConfirm={() => {
                            closeFundRaise(profile.fund_id).then((closed) => {
                                if (closed) {
                                    toast.success("An verification email has to be sent to your email address")
                                } else {
                                    toast.error("Something went wrong")
                                }
                            }).catch((err) => {
                                toast.error("Something went wrong")
                            })
                            onClose()
                        }}
                        title={title}
                    />
                )
            }
        })
    }

    return (
        <div className="w-full flex mx-auto mb-5 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <div className="w-3/12">
                <a href="#">
                    <LoadImage className="w-full h-full  object-cover" imageurl={`${process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL}/fundRaisers/fundRaiser1.png`} />
                </a>
            </div>
            <div className="w-9/12">
                <div className="p-6">
                    <div className="w-full flex gap-10">
                        <div className='w-2/4'>
                            <a href="#">
                                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{profile.full_name}'s Fund Raiser for {profile.category} in {profile.district}</h3>
                            </a>
                            <p className="mb-4 text-sm text-gray-700 dark:text-gray-400">
                                {profile.about}
                            </p>
                            <div className="flex items-center justify-between mt-4">
                                {
                                    profile.status != FundRaiserStatus.CLOSED ? <button onClick={close} type="button" className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                                        <i className="fa-solid fa-lock mr-2"></i> Close Post
                                    </button> : <img src='/images/icons/closed.png' className='w-12' />
                                }
                                <button type="button" className="text-sm font-medium text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 dark:text-white dark:border-gray-600">Edit Post</button>
                            </div>
                        </div>

                        <div className='w-2/4'>
                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                                    <span>Raised: {const_data.MONEY_ICON}{profile.collected}</span>
                                    <span>Goal: {const_data.MONEY_ICON}{profile.amount}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                    <div style={{ width: `${collectedPercentage}%` }} className="min-w-[2%] bg-blue-600 h-2.5 rounded-full" ></div>
                                </div>


                            </div>
                            <div>
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                    <tbody>
                                        <tr className="hover:bg-gray-100 text-center">
                                            <td className="py-3 px-4 border-b font-semibold text-gray-700">Fund Raiser ID</td>
                                            <td className="py-3 px-4 border-b text-gray-600">{profile.fund_id}</td>
                                        </tr>
                                        <tr className="hover:bg-gray-100 text-center">
                                            <td className="py-3 px-4 border-b font-semibold text-gray-700">Targeted Amount</td>
                                            <td className="py-3 px-4 border-b text-gray-600">{const_data.MONEY_ICON}{profile.amount}</td>
                                        </tr>
                                        <tr className="hover:bg-gray-100 text-center">
                                            <td className="py-3 px-4 border-b font-semibold text-gray-700">Total Raised</td>
                                            <td className="py-3 px-4 border-b text-gray-600">{const_data.MONEY_ICON}{profile.collected}</td>
                                        </tr>
                                        <tr className="hover:bg-gray-100 text-center">
                                            <td className="py-3 px-4 border-b font-semibold text-gray-700">Deadline</td>
                                            <td className="py-3 px-4 border-b text-gray-600">{formatDateToMonthNameAndDate(profile.deadline)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default MyFundRaisingItem