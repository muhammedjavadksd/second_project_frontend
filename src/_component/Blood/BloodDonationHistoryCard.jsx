import React from 'react'

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
                        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                            <span>Download Certificate</span>
                        </button>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default BloodDonationHistoryCard