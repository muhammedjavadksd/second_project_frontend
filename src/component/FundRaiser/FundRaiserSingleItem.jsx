import React from 'react'

function FundRaiserSingleItem() {
    return (
        <>
            <div class="mb-5 max-w-sm bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img class="w-100" src={`${process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL}/fundRaisers/fundRaiser1.png`} alt="" />
                </a>
                <div class="p-5 pb-0">
                    <div class="grid  mb-3 grid-cols-3 gap-3 items-center	">
                        <div className='text-left font-sans'>
                            <span className='redColor sedan-sc-regular'>Goal</span>
                            <h6 className='text-blue-500'>$4000</h6>
                        </div>
                        <div className='text-center font-sans'>
                            <span>Rise</span>
                            <h6 className='text-blue-500'>$4000</h6>

                        </div>
                        <div className='text-right font-sans'>
                            <span>To go</span>
                            <h6 className='text-blue-500'>$4000</h6>

                        </div>
                    </div>
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <div class="flex items-center justify-between">
                        <button type="button" class="items-center flex text-blue-600  me-2 mb-2 text-sm font-medium   focus:outline-none bg-white rounded-lg">
                            <svg class="w-6 h-6 text-gray-800 dark:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd" />
                            </svg>
                            Adam
                        </button>
                        <div>
                            <button type="button" class="text-blue-600 bg-white border border-blue-600 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Donate Now</button>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default FundRaiserSingleItem