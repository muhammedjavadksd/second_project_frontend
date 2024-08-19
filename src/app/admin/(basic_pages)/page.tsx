"use client"
import AdminLayout from '@/component/Admin/AdminLayout'
import DashboardCard from '@/component/Util/DashboardCard'
import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts'
import const_data from '@/util/data/const'
import { userGrowthGraph, userTypeOptions } from './data'
import TableSimple from '@/component/Util/TableSimple'
import PaginationTab from '@/component/Util/PaginationTab'
import AdminDateFilter from '@/component/Util/AdminDateFilter'
import { useSession } from 'next-auth/react'
import AdminPrivateRouter from '@/component/LoginComponent/AdminPrivateRouter'

function DashboardPage(): React.ReactElement {

  var CanvasJSChart: CanvasJSReact = CanvasJSReact.CanvasJSChart;

  return (
    <AdminPrivateRouter>
      <AdminLayout>


        <AdminDateFilter></AdminDateFilter>


        <div className='mt-5'>
          <h4 className='font-medium text-2xl'>Site static's</h4>
          <div className='grid grid-cols-4 mt-2 gap-5 flex'>
            <DashboardCard icon={null} classNames={'bg-white'} title={"Total donor's"} data={100} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"Urgent Blood Need"} data={24} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"Dead line crossed"} data={"25"} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"Total patient's"} data={200} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"Total organization"} data={10} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"Blood shortage"} data={"A+"} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"Total Fund raiser's"} data={200} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"Total Fund Raised"} data={"25,000"} />
          </div>
        </div>

        <div className='mt-5'>
          <h4 className='font-medium text-2xl'>Blood availability</h4>
          <div className='grid grid-cols-4 mt-2 gap-5 flex'>
            <DashboardCard icon={null} classNames={'bg-white'} title={"A+"} data={"Unit"} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"A-"} data={"Unit"} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"B+"} data={"Unit"} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"B-"} data={"Unit"} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"O+"} data={"Unit"} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"O-"} data={"Unit"} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"AB+"} data={"Unit"} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"AB-"} data={"Unit"} />

          </div>
        </div>


        <div className='mt-5'>
          <h4 className='font-medium text-2xl mb-2'>Progress Data</h4>
          <div className='flex gap-5'>

            <div className='w-2/6'>



              <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                <div className="flex justify-between">
                  <div>
                    <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">32,000{const_data.MONEY_ICON}</h5>
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
            <TableSimple onAllItemCheck={() => { }} onItemChecked={() => { }} selectedItem={[]} headers={['Product Name', 'Color', 'Category', 'Price', 'Action']} data={[{
              name: "Sample One", color: 'Red', category: 'Shoes', price: '12,00', action: <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> View</button>
            }, {
              name: "Sample One", color: 'Red', category: 'Shoes', price: '12,00', action: <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> View</button>
            }, {
              name: "Sample One", color: 'Red', category: 'Shoes', price: '12,00', action: <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> View</button>
            }, {
              name: "Sample One", color: 'Red', category: 'Shoes', price: '12,00', action: <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> View</button>
            }]} />
            <PaginationTab total_pages={10} total_records={10} from={1} to={5} onClick={() => { }} />
          </div>

        </div>





      </AdminLayout>
    </AdminPrivateRouter>

  )
}

export default DashboardPage