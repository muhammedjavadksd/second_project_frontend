"use client"
import AccountTab from '@/_component/Account/AccountTab'
import Header from '@/_component/Header/Header'
import BreadCrumb from '@/_component/Util/BreadCrumb'
import Footer from '@/_component/Util/Footer'
import SliderComponent from '@/_component/Util/SliderComponent'
import StatisticCard from '@/_component/Util/StatisticCard'
import { CChart } from '@coreui/react-chartjs'
import React from 'react'


function FundRaiserView() {


    return (
        <>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Home', 'Profile', 'My Fund Raising', 'Raising Name-ID']} />
                </div>
                <div className="flex gap-5">
                    <div className='w-1/4'>
                        <AccountTab />

                        <a href="#" class="mt-5 block max-w-sm  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <div id="default-carousel" class="relative w-full" data-carousel="slide">
                                <SliderComponent isGap={true} slidesToScroll={1} slidesToShow={1} dots={true} arrow={true} >
                                    <img src="https://flowbite.com/docs/images/blog/image-1.jpg" class="  block w-full  " alt="..." />
                                    <img src="https://flowbite.com/docs/images/blog/image-1.jpg" class="  block w-full  " alt="..." />
                                    <img src="https://flowbite.com/docs/images/blog/image-1.jpg" class="  block w-full  " alt="..." />
                                </SliderComponent>
                            </div>
                        </a>

                        <a href="#" class="mt-5 block max-w-sm  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <div id="default-carousel" class="relative w-full" data-carousel="slide">
                                <SliderComponent isGap={true} slidesToScroll={1} slidesToShow={1} dots={true} arrow={true} >
                                    <img src="https://flowbite.com/docs/images/blog/image-1.jpg" class="  block w-full  " alt="..." />
                                    <img src="https://flowbite.com/docs/images/blog/image-1.jpg" class="  block w-full  " alt="..." />
                                    <img src="https://flowbite.com/docs/images/blog/image-1.jpg" class="  block w-full  " alt="..." />
                                </SliderComponent>
                            </div>
                        </a>

                    </div>
                    <div className='w-4/5'>
                        <div className="grid gap-5 grid-cols-3">
                            <StatisticCard title={"Target"} statistic={"723₹"} icon={<i class="fa-solid fa-money-bill"></i>}></StatisticCard>
                            <StatisticCard title={"Collected"} statistic={"510₹"} icon={<i class="fa-solid fa-money-bill"></i>}></StatisticCard>
                            <StatisticCard title={"Dead Line"} statistic={"12-05-2022"} icon={<i class="fa-solid fa-calendar"></i>}></StatisticCard>
                        </div>


                        <div className="flex gap-5">
                            <div className="w-2/4">
                                <div class=" w-full mt-3 bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                                    <h2 className='font-medium text-2xl mb-3'>Target statistic's</h2>
                                    <div className="mt-0">
                                        <CChart
                                            type="doughnut"
                                            data={{
                                                labels: ['Target', 'Goal'],
                                                datasets: [
                                                    {
                                                        backgroundColor: ['#41B883', '#E46651'],
                                                        data: [40, 20],
                                                    },
                                                ],
                                            }}
                                            options={{
                                                plugins: {
                                                    legend: {
                                                        labels: {
                                                            // color: getStyle('--cui-body-color'),
                                                        }
                                                    }
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="w-3/4">
                                <div class=" w-full mt-3 bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                                    <h2 className='font-medium text-2xl mb-3'>Fund statistic's</h2>

                                    <CChart
                                        type="line"
                                        data={{
                                            labels: ["January", "February", "March", "April", "May", "June", "July"],
                                            datasets: [
                                                {
                                                    label: "Fund Donated",
                                                    backgroundColor: "rgba(220, 220, 220, 0.2)",
                                                    borderColor: "rgba(220, 220, 220, 1)",
                                                    pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                                    pointBorderColor: "#fff",
                                                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
                                                },
                                                {
                                                    label: "Post viewed",
                                                    backgroundColor: "rgba(151, 187, 205, 0.2)",
                                                    borderColor: "rgba(151, 187, 205, 1)",
                                                    pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                                    pointBorderColor: "#fff",
                                                    data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
                                                },
                                            ],
                                        }}
                                        options={{
                                            plugins: {
                                                legend: {
                                                    labels: {
                                                        //   color: getStyle('--cui-body-color'),
                                                    }
                                                }
                                            },
                                            scales: {
                                                x: {
                                                    grid: {
                                                        //   color: getStyle('--cui-border-color-translucent'),
                                                    },
                                                    ticks: {
                                                        //   color: getStyle('--cui-body-color'),
                                                    },
                                                },
                                                y: {
                                                    grid: {
                                                        //   color: getStyle('--cui-border-color-translucent'),
                                                    },
                                                    ticks: {
                                                        //   color: getStyle('--cui-body-color'),
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>



                        <div class="relative mt-5 overflow-x-auto shadow-md sm:rounded-lg">
                            <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">

                                <label for="table-search" class="sr-only">Search</label>
                                <div class="relative p-10 pt-0 pb-0">
                                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input type="text" id="table-search-users" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                                </div>
                            </div>
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="p-4">
                                            <div class="flex items-center">
                                                <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Amount
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Date
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="w-4 p-4">
                                            <div class="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                                            <div class="ps-3">
                                                <div class="text-base font-semibold">Neil Sims</div>
                                                <div class="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                            </div>
                                        </th>
                                        <td class="px-6 py-4">
                                            React Developer
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="w-4 p-4">
                                            <div class="flex items-center">
                                                <input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image" />
                                            <div class="ps-3">
                                                <div class="text-base font-semibold">Bonnie Green</div>
                                                <div class="font-normal text-gray-500">bonnie@flowbite.com</div>
                                            </div>
                                        </th>
                                        <td class="px-6 py-4">
                                            Designer
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="w-4 p-4">
                                            <div class="flex items-center">
                                                <input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-2.jpg" alt="Jese image" />
                                            <div class="ps-3">
                                                <div class="text-base font-semibold">Jese Leos</div>
                                                <div class="font-normal text-gray-500">jese@flowbite.com</div>
                                            </div>
                                        </th>
                                        <td class="px-6 py-4">
                                            Vue JS Developer
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="w-4 p-4">
                                            <div class="flex items-center">
                                                <input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Jese image" />
                                            <div class="ps-3">
                                                <div class="text-base font-semibold">Thomas Lean</div>
                                                <div class="font-normal text-gray-500">thomes@flowbite.com</div>
                                            </div>
                                        </th>
                                        <td class="px-6 py-4">
                                            UI/UX Engineer
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                        </td>
                                    </tr>
                                    <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="w-4 p-4">
                                            <div class="flex items-center">
                                                <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-4.jpg" alt="Jese image" />
                                            <div class="ps-3">
                                                <div class="text-base font-semibold">Leslie Livingston</div>
                                                <div class="font-normal text-gray-500">leslie@flowbite.com</div>
                                            </div>
                                        </th>
                                        <td class="px-6 py-4">
                                            SEO Specialist
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <div class="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Offline
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default FundRaiserView