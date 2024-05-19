import React from 'react'
import DownloadButton from '../Util/downloadButton'

function BloodDonationHistoryCard() {
    return (
        <div class="rounded mb-3 p-2 ring-1 xl:p-10 ring-gray-300">
            <div className="flex gap-10">
                <div className='w-1/6'>
                    <div className='text-white flex items-center justify-center flex-col bg-green-500 p-4 rounded-lg'>
                        <h3 id="tier-startup" class="text-2xl font-semibold leading-8 mb-2 text-white">A+ </h3>
                        <span>Donated</span>
                    </div>
                </div>
                <div className="w-3/6">
                    <div className='flex flex-col h-full  justify-center'>
                        <p class="mt-0 text-sm leading-6 text-cyan-600">You have successfully donated A+ blood to Muhammed Javad</p>

                        <div>
                            <span class="text-sm font-semibold leading-6 text-teal-600">Patient Name : Aaradh KM</span>

                        </div>
                        <div>
                            <span class="text-sm font-semibold leading-6 text-black">Donated Date : 12/06/20244</span>
                        </div>
                    </div>
                </div>
                <div className="w-2/6">
                    <div className='flex w-full items-center justify-end w-full h-full'>
                        <DownloadButton title={"Download Certificate"} onClick={() => { }} />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default BloodDonationHistoryCard