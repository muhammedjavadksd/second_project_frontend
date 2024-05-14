import React from 'react'

function EventPromo() {
    return (
        <div className='container mx-auto pt-5 pb-5'>

            <div className='mt-10'>
                <div class="grid  mb-3 grid-cols-2 gap-3 items-center ">
                    <div>
                        <h2 class="text-4xl font-extrabold dark:text-white">Multiple Event & Conference</h2>
                        <p class="my-4 text-lg text-gray-500">Lorem Ipsum is simply dummy text of the printing and typesetting industry ore</p>
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">View all event's</button>

                    </div>
                    <div>

                        <div class="flex flex-col items-center mb-3 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img class="flex-1 ml-3 object-cover w-full rounded-t-lg h-20" src="images/fundRaisers/fundRaiser1.png" alt="" />
                            <div class="flex flex-col justify-between p-2 leading-normal">
                                <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                <p class="mb-3 text-sm text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            </div>
                        </div>

                        <div class="flex flex-col items-center mb-3 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img class="flex-1 ml-3 object-cover w-full rounded-t-lg h-20" src="images/fundRaisers/fundRaiser1.png" alt="" />
                            <div class="flex flex-col justify-between p-2 leading-normal">
                                <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                <p class="mb-3 text-sm text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventPromo