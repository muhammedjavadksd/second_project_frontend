import SectionTitle from '@/_component/Util/SectionTitle'
import React from 'react'

function CouldHelp() {
    return (
        <div className='mb-10'>
            <SectionTitle title={"How Could You "} focus_text={"Help?"} sub_title={null}></SectionTitle>
            <div class="grid grid-cols-3 gap-4 items-center	">

                <div class="text-center  block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className='justify-center flex mb-3'>
                        <img src="images/icons/volunteer.png" alt="" height={"32px"} />
                    </div>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Become volunteer</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">You can contribute your time, skills and knowledge through volunteering with the UN.</p>
                    <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Register Now </button>
                </div>

                <div class="text-center  block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className='justify-center flex mb-3'>
                        <img src="images/icons/spread_love.png" alt="" width={"60px"}  height={"32px"} />
                    </div>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Call for donation</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">You can contribute your time, skills and knowledge through volunteering with the UN.</p>
                    <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Register Now </button>
                </div>


                
                <div class="text-center  block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className='justify-center flex mb-3'>
                        <img src="images/icons/spread_love.png" alt="" width={"60px"} height={"32px"} />
                    </div>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Send donation</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">You can contribute your time, skills and knowledge through volunteering with the UN.</p>
                    <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Register Now </button>
                </div>




            </div>
        </div>
    )
}

export default CouldHelp