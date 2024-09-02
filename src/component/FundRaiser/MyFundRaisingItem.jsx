import const_data from '@/util/data/const'
import { formatDateToMonthNameAndDate } from '@/util/data/helper/utilHelper'
import React from 'react'

function MyFundRaisingItem({ isApproved }) {
    return (
        <div class="flex mx-auto mb-5 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="w-full h-full  object-cover" src={`${process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL}/fundRaisers/fundRaiser1.png`} alt="Fundraiser Image" />
            </a>
            <div class="p-6">
                <div className="w-full flex gap-10">
                    <div className="w-2/4">
                        <a href="#">
                            <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">Noteworthy Technology Acquisitions 2021</h3>
                        </a>
                        <p class="mb-4 text-sm text-gray-700 dark:text-gray-400">
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type ...
                        </p>

                        <div class="mb-4">
                            <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                                <span>Raised: $2000</span>
                                <span>Goal: $4000</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div class="bg-blue-600 h-2.5 rounded-full" ></div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between mt-4">
                            <button type="button" class="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                                <i class="fa-solid fa-lock mr-2"></i> Close Post
                            </button>
                            <button type="button" class="text-sm font-medium text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 dark:text-white dark:border-gray-600">Edit Post</button>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                            <tbody>
                                <tr className="hover:bg-gray-100 text-center">
                                    <td className="py-3 px-4 border-b font-semibold text-gray-700">Fund Raiser ID</td>
                                    <td className="py-3 px-4 border-b text-gray-600">BDUTWY</td>
                                </tr>
                                <tr className="hover:bg-gray-100 text-center">
                                    <td className="py-3 px-4 border-b font-semibold text-gray-700">Targeted Amount</td>
                                    <td className="py-3 px-4 border-b text-gray-600">{const_data.MONEY_ICON}22,000</td>
                                </tr>
                                <tr className="hover:bg-gray-100 text-center">
                                    <td className="py-3 px-4 border-b font-semibold text-gray-700">Total Raised</td>
                                    <td className="py-3 px-4 border-b text-gray-600">{const_data.MONEY_ICON}32,000</td>
                                </tr>
                                <tr className="hover:bg-gray-100 text-center">
                                    <td className="py-3 px-4 border-b font-semibold text-gray-700">Deadline</td>
                                    <td className="py-3 px-4 border-b text-gray-600">{formatDateToMonthNameAndDate(new Date())}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MyFundRaisingItem