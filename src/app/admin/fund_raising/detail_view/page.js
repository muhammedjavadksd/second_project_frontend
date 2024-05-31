"use client"
import AdminLayout from '@/_component/Admin/AdminLayout'
import AdminBreadCrumb from '@/_component/Util/AdminBreadCrumb'
import DashboardCard from '@/_component/Util/DashboardCard'
import { MONEY_ICON } from '@/app/_util/_const/const'
import CanvasJSReact from '@canvasjs/react-charts/canvasjs.react.js'
import React from 'react'
import { fundRaiserGraph } from './data'
import SliderComponent from '@/_component/Util/SliderComponent'

function FundRaiserDetailView() {
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    return (
        <AdminLayout>
            <div className='grid grid-cols-2'>
                <div>
                    <AdminBreadCrumb root={{ title: "Dashboard", href: "/" }} title={"Detail view for Muhammed Javad case"} paths={[{ title: "Manage Fund Raiser's", href: "/" }, { title: "View Fund Raiser", href: "/" }]} />
                </div>
                <div className='buttonGroups flex items-center justify-end gap-3'>
                    <button className='bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5'><i class="fa-solid fa-download"></i> Export </button>
                    <button className='bg-red-700 text-sm text-white p-2 rounded-lg pl-5 pr-5'> Close the case </button>
                    <button className='bg-green-700 text-sm text-white p-2 rounded-lg pl-5 pr-5'> Verify Case </button>

                </div>
            </div>
            <div className='flex mt-5 gap-5'>
                <div className='w-1/4'>
                    <div class="bg-white shadow-xl rounded-lg py-3">
                        <div class="photo-wrapper p-2">
                            <img class="w-32 h-32 rounded-full mx-auto" src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="John Doe" />
                        </div>
                        <div class="p-2">
                            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">Joh Doe</h3>
                            <div class="text-center text-gray-400 text-xs font-semibold">
                                <p>Web Developer</p>
                            </div>
                            <table class="text-xs my-3">
                                <tbody><tr>
                                    <td class="px-2 py-2 text-gray-500 font-semibold">Address</td>
                                    <td class="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                                </tr>
                                    <tr>
                                        <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                        <td class="px-2 py-2">+977 9955221114</td>
                                    </tr>
                                    <tr>
                                        <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                        <td class="px-2 py-2">john@exmaple.com</td>
                                    </tr>
                                </tbody></table>

                            <div class="text-center my-3">
                                <a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a>
                            </div>

                        </div>
                    </div>

                    <a href="#" class="gap-5 mt-5 w-full   bg-white   focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                        <i class="fa-solid fa-pencil"></i>
                        <div class="text-left rtl:text-right w-full">
                            <div class="mb-1 text-xs">Created By</div>
                            <div class="-mt-1 font-sans text-sm font-semibold">ManjaPada  fans organization</div>
                        </div>
                    </a>
                    <a href="#" class="gap-5 flex mt-5 w-full   bg-white   focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg  items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                        <div className='w-1/6'>
                            <i class="fa-solid fa-phone"></i>
                        </div>
                        <div className='w-5/6'>
                            <div className='text-ellipsis'>
                                <div class="text-left rtl:text-right w-fit">
                                    <div class="mb-1 text-xs">Contact Details</div>
                                    <div class="-mt-1 font-sans text-sm font-semibold">+91 9744727684</div>
                                    <div class="-mt-1 font-sans text-sm font-semibold text-ellipsis ">muhammedjavad119144@gmail.com</div>
                                </div>
                            </div>
                        </div>
                    </a>




                </div>
                <div className='w-3/4'>
                    <div className='grid grid-cols-3 flex gap-5 '>
                        <DashboardCard title={"Target"} data={`10,000${MONEY_ICON}`} />
                        <DashboardCard title={"Collected"} data={`5,000${MONEY_ICON}`} />
                        <DashboardCard title={"Deadline"} data={`12/02/2024`} />
                    </div>
                    <div class="mt-5 w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                        <div class="flex justify-between">
                            <div>
                                <h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">23,533 {MONEY_ICON}</h5>
                                <p class="text-base font-normal text-gray-500 dark:text-gray-400">has been collected</p>
                            </div>
                            <div
                                class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                                12%
                                <svg class="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                                </svg>
                            </div>
                        </div>

                        <div className='mt-5'>
                            <CanvasJSChart options={fundRaiserGraph}
                            />
                        </div>
                    </div>
                    {/* <div class="mt-5 w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">

                        <div class="gap-5   mt-5 w-full   bg-white   focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg  items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <div>
                                <SliderComponent arrow={false} isGap={false} slidesToScroll={1} slidesToShow={2} dots={false} >

                                    <div class="photo-wrapper w-full">
                                        <img class="w-full h-full " src="https://pbs.twimg.com/media/DrDt4s_UcAAYuDE.jpg" alt="John Doe" />
                                    </div>
                                    <div class="photo-wrapper">
                                        <img class="w-full h-full" src="https://pbs.twimg.com/media/DrDt4s_UcAAYuDE.jpg" alt="John Doe" />
                                    </div>
                                    <div class="photo-wrapper">
                                        <img class="w-full h-full" src="https://pbs.twimg.com/media/DrDt4s_UcAAYuDE.jpg" alt="John Doe" />
                                    </div>
                                    <div class="photo-wrapper">
                                        <img class="w-full h-full" src="https://pbs.twimg.com/media/DrDt4s_UcAAYuDE.jpg" alt="John Doe" />
                                    </div>

                                </SliderComponent>
                            </div>
                        </div>

                    </div> */}



                </div>
            </div>
        </AdminLayout>
    )
}

export default FundRaiserDetailView