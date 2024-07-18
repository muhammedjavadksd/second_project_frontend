import { MONEY_ICON } from '@/util/data/const'
import React from 'react'
import DownloadButton from '../Util/downloadButton'

function FundDonatedHistoryCard() {
    return (
        <div className='mt-5'>
            <div class="w-full">
                <div class="flex rounded bg-gray-50 px-6 pt-0 shadow-lg">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="chippz" class="py-4 mr-10" />
                    <div className='flex gap-10 pt-3 pb-3 items-center justify-center w-full'>
                        <div class="w-2/6">
                            <h4 class="font-semibold">Name : Aaradh Km</h4>
                            <p class="text-xs">Case : Health Problem</p>
                            <p class="text-xs mt-2">Focus : IED</p>
                            <div className='mt-3'>
                                <DownloadButton title={"Download Recipt"} onClick={() => { }} />
                            </div>
                        </div>

                        <div class="w-2/6 gap-3 border-b py-6 text-xs">
                            <p class="flex justify-between">
                                <span class="text-gray-400">Receipt No.:</span>
                                <span>#5033</span>
                            </p>
                            <p class="flex justify-between">
                                <span class="text-gray-400">Payment Type:</span>
                                <span>Online Payment</span>
                            </p>
                            <p class="flex justify-between">
                                <span class="text-gray-400">Date:</span>
                                <span>12/04/2024</span>
                            </p>
                            <p class="flex justify-between">
                                <span class="text-gray-400">Status:</span>
                                <span>Paid</span>
                            </p>
                        </div>
                        <div class="w-2/6 gap-3 pb-6 pt-2 text-xs">
                            <table class="w-full text-left">
                                <thead>
                                    <tr class="flex">
                                        <th class="w-full py-2">Details</th>
                                        <th class="min-w-[44px] py-2">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="flex">
                                        <td class="flex-1 py-1">Aaradh Donation</td>
                                        <td class="min-w-[44px]">100 {MONEY_ICON}</td>
                                    </tr>
                                    <tr class="flex py-1">
                                        <td class="flex-1">Life Link Donation</td>
                                        <td class="min-w-[44px]">20 {MONEY_ICON}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class=" border-b border border-dashed"></div>

                        </div>
                    </div>
                </div>
            </div></div>
    )
}

export default FundDonatedHistoryCard