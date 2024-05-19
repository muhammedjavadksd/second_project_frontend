"use client"
import AdminLayout from '@/_component/Admin/AdminLayout'
import AdminBreadCrumb from '@/_component/Util/AdminBreadCrumb'
import DashboardCard from '@/_component/Util/DashboardCard'
import { MONEY_ICON } from '@/app/const/const'
// import CanvasJSReact from '@canvasjs/react-charts/canvasjs.react.js'
import React from 'react'

function FundRaiserDetailView() {
//   var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    return (
        <AdminLayout>
            <div className='grid grid-cols-2'>
                <div>
                    <AdminBreadCrumb root={{ title: "Dashboard", href: "/" }} title={"Detail view for Muhammed Javad case"} paths={[{ title: "Manage Fund Raiser's", href: "/" }, { title: "View Fund Raiser", href: "/" }]} />
                </div>
                <div className='buttonGroups flex items-center justify-end gap-3'>
                    <button className='bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5'><i class="fa-solid fa-download"></i> Export </button>
                    <button className='bg-red-700 text-sm text-white p-2 rounded-lg pl-5 pr-5'> Close the case </button>
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
                </div>
                <div className='w-3/4'>
                    <div className='grid grid-cols-3 flex gap-5 '>
                        <DashboardCard title={"Target"} data={`10,000${MONEY_ICON}`} />
                        <DashboardCard title={"Collected"} data={`5,000${MONEY_ICON}`} />
                        <DashboardCard title={"Deadline"} data={`12/02/2024`} />
                    </div>
                    <div class=" w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
              <div class="flex justify-between">
                <div>
                  <h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">500</h5>
                  <p class="text-base font-normal text-gray-500 dark:text-gray-400">New User's</p>
                </div>
                <div
                  class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                  12%
                  <svg class="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                  </svg>
                </div>
              </div>
              <div>
                {/* <CanvasJSChart options={userGrowthGraph}
                /> */}
              </div>

            </div>


                </div>
            </div>
        </AdminLayout>
    )
}

export default FundRaiserDetailView