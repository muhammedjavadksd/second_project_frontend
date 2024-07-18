"use client"
import AdminLayout from '@/_component/Admin/AdminLayout'
import DashboardCard from '@/_component/Util/DashboardCard'
import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts'
import { MONEY_ICON } from '@/util/data/const'
import { userGrowthGraph, userTypeOptions } from './data'
import TableSimple from '@/_component/Util/TableSimple'
import PaginationTab from '@/_component/Util/PaginationTab'
import OrganizationBlackRouter from '@/_component/LoginComponent/OrganizationBlackRouter'
import OrganizationPrivateRouter from '@/_component/LoginComponent/OrganizationPrivateRouter'

function DashboardPage(): React.ReactElement {

  var CanvasJSChart: CanvasJSReact = CanvasJSReact.CanvasJSChart;



  return (
    <OrganizationPrivateRouter>
      <AdminLayout>


        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            All time
          </button>
          <button type="button" className="inline-flex border-r items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
            </svg>
            1 Month
          </button>
          <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
            </svg>
            6 Month
          </button>
          <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
            </svg>
            12 Month
          </button>


        </div>


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



              <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                <div className="flex justify-between">
                  <div>
                    <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">32,000{MONEY_ICON}</h5>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Total Fund Raised</p>
                  </div>
                  <div
                    className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                    12%
                    <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
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



              <div className=" w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                <div className="flex justify-between">
                  <div>
                    <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">500</h5>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">New User's</p>
                  </div>
                  <div
                    className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                    12%
                    <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
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


          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <TableSimple headers={['Product Name', 'Color', 'Category', 'Price', 'Action']} data={[{
              name: "Sample One", color: 'Red', category: 'Shoes', price: '12,00', action: <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> View</button>
            }, {
              name: "Sample One", color: 'Red', category: 'Shoes', price: '12,00', action: <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> View</button>
            }, {
              name: "Sample One", color: 'Red', category: 'Shoes', price: '12,00', action: <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> View</button>
            }, {
              name: "Sample One", color: 'Red', category: 'Shoes', price: '12,00', action: <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> View</button>
            }]} />
            <PaginationTab from={1} to={6} onClick={() => { }} />
          </div>

        </div>
      </AdminLayout>
    </OrganizationPrivateRouter>

  )
}

export default DashboardPage