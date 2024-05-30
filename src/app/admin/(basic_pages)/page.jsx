"use client"
import AdminLayout from '@/_component/Admin/AdminLayout'
import DashboardCard from '@/_component/Util/DashboardCard'
import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts'
import { MONEY_ICON } from '@/app/const/const'
import { userGrowthGraph, userTypeOptions } from './data'
import TableSimple from '@/_component/Util/TableSimple'
import PaginationTab from '@/_component/Util/PaginationTab'
import AdminDateFilter from '@/_component/Util/AdminDateFilter'
import { useSession } from 'next-auth/react'
import AdminPrivateRouter from '@/_component/LoginComponent/AdminPrivateRouter'

function DashboardPage() {

  var CanvasJSChart = CanvasJSReact.CanvasJSChart;




  return (
    <AdminPrivateRouter>
      <AdminLayout>


        <AdminDateFilter></AdminDateFilter>


        <div className='mt-5'>
          <h4 className='font-medium text-2xl'>Site static's</h4>
          <div className='grid grid-cols-4 mt-2 gap-5 flex'>
            <DashboardCard title={"Total donor's"} data={100} />
            <DashboardCard title={"Urgent Blood Need"} data={24} />
            <DashboardCard title={"Dead line crossed"} data={"25"} />
            <DashboardCard title={"Total patient's"} data={200} />
            <DashboardCard title={"Total organization"} data={10} />
            <DashboardCard title={"Blood shortage"} data={"A+"} />
            <DashboardCard title={"Total Fund raiser's"} data={200} />
            <DashboardCard title={"Total Fund Raised"} data={"25,000"} />
          </div>
        </div>

        <div className='mt-5'>
          <h4 className='font-medium text-2xl'>Blood availability</h4>
          <div className='grid grid-cols-4 mt-2 gap-5 flex'>
            <DashboardCard title={"A+"} data={"Unit"} />
            <DashboardCard title={"A-"} data={"Unit"} />
            <DashboardCard title={"B+"} data={"Unit"} />
            <DashboardCard title={"B-"} data={"Unit"} />
            <DashboardCard title={"O+"} data={"Unit"} />
            <DashboardCard title={"O-"} data={"Unit"} />
            <DashboardCard title={"AB+"} data={"Unit"} />
            <DashboardCard title={"AB-"} data={"Unit"} />

          </div>
        </div>


        <div className='mt-5'>
          <h4 className='font-medium text-2xl mb-2'>Progress Data</h4>
          <div className='flex gap-5'>

            <div className='w-2/6'>



              <div class="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                <div class="flex justify-between">
                  <div>
                    <h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">32,000{MONEY_ICON}</h5>
                    <p class="text-base font-normal text-gray-500 dark:text-gray-400">Total Fund Raised</p>
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
                  <CanvasJSChart options={userTypeOptions}
                  />
                </div>

              </div>
            </div>
            <div className='w-4/6'>



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
                  <CanvasJSChart options={userGrowthGraph}
                  />
                </div>

              </div>




            </div>

          </div>
        </div>


        <div className="mt-5">


          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <TableSimple headers={['Product Name', 'Color', 'Category', 'Price', 'Action']} data={[{
              name: "Sample One", color: 'Red', category: 'Shoes', price: '12,00', action: <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> View</button>
            }, {
              name: "Sample One", color: 'Red', category: 'Shoes', price: '12,00', action: <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> View</button>
            }, {
              name: "Sample One", color: 'Red', category: 'Shoes', price: '12,00', action: <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> View</button>
            }, {
              name: "Sample One", color: 'Red', category: 'Shoes', price: '12,00', action: <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> View</button>
            }]} />
            <PaginationTab />
          </div>

        </div>





      </AdminLayout>
    </AdminPrivateRouter>

  )
}

export default DashboardPage