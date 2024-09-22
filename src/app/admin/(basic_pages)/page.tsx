"use client"
import AdminLayout from '@/component/Admin/AdminLayout'
import DashboardCard from '@/component/Util/DashboardCard'
import React, { useEffect, useState } from 'react'
import CanvasJSReact from '@canvasjs/react-charts'
import const_data from '@/util/data/const'
import { userGrowthGraph, userTypeOptions } from './data'
import TableSimple from '@/component/Util/TableSimple'
import PaginationTab from '@/component/Util/PaginationTab'
import AdminDateFilter from '@/component/Util/AdminDateFilter'
import { useSession } from 'next-auth/react'
import AdminPrivateRouter from '@/component/LoginComponent/AdminPrivateRouter'
import { getFundRaiserStatitics, getBloodStataitic } from '@/util/data/helper/APIHelper'
import { IBloodStatitics, IFundRaiseStatitics } from '@/util/types/API Response/FundRaiser'

function DashboardPage(): React.ReactElement {

  var CanvasJSChart: CanvasJSReact = CanvasJSReact.CanvasJSChart;
  const [fundRaiseStatistics, setFundRaiserStatitics] = useState<IFundRaiseStatitics | null>(null)
  const [bloodStatitics, setBloodStatitics] = useState<IBloodStatitics | null>(null)

  async function statitics() {
    const fundRaiser = await getFundRaiserStatitics();
    const bloodStatitics = await getBloodStataitic();
    if (fundRaiser) {
      setFundRaiserStatitics(fundRaiser)
    }
    if (bloodStatitics) {
      setBloodStatitics(bloodStatitics)
    }
  }

  useEffect(() => {
    statitics()
  }, [])

  return (
    <AdminPrivateRouter>
      <AdminLayout>


        {/* <AdminDateFilter onDateSelect={() => { }}></AdminDateFilter> */}


        <div className='mt-0'>
          <h4 className='font-medium text-2xl'>Blood static's</h4>
          <div className='grid grid-cols-4 mt-2 gap-5 flex'>
            <DashboardCard icon={null} classNames={'bg-white'} title={"Total donor's"} data={bloodStatitics?.blood_donor?.totalDonors || 0} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"Active donors"} data={bloodStatitics?.blood_donor?.openDonors || 0} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"In active donors"} data={bloodStatitics?.blood_donor?.closedDonors || 0} />

            {
              bloodStatitics?.blood_donor?.donorsByBloodGroup.map((item) => {
                return <DashboardCard icon={null} classNames={'bg-white'} title={`${item._id} Donors`} data={item.count} />
              })
            }

            <DashboardCard icon={null} classNames={'bg-white'} title={"Active blood need"} data={bloodStatitics?.blood_requirement?.openRequests || 0} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"Closed blood need"} data={bloodStatitics?.blood_requirement?.closedRequests || 0} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"Total blood need"} data={bloodStatitics?.blood_requirement?.totalRequests || 0} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"Total unit need"} data={bloodStatitics?.blood_requirement?.totalUnitsNeeded || 0} />
            {
              bloodStatitics?.blood_requirement?.requestsByBloodGroup?.map((item) => {
                return <DashboardCard icon={null} classNames={'bg-white'} title={`${item._id}  need`} data={item?.count || 0} />
              })
            }
            {
              bloodStatitics?.blood_requirement?.requestsByStatus?.map((item) => {
                return <DashboardCard icon={null} classNames={'bg-white'} title={`Blood req ${item._id}`} data={item?.count || 0} />
              })
            }
          </div>
        </div>

        <div className='mt-5'>
          <h4 className='font-medium text-2xl'>Fund raiser static's</h4>
          <div className='grid grid-cols-4 mt-2 gap-5 flex'>
            <DashboardCard
              icon={null}
              classNames={'bg-white'}
              title={"Total Fund Raisers"}
              data={fundRaiseStatistics?.fund_raiser?.total_fund_raiser || 0}
            />
            <DashboardCard
              icon={null}
              classNames={'bg-white'}
              title={"Active Fund Raisers"}
              data={fundRaiseStatistics?.fund_raiser?.activeFundRaise || 0}
            />
            <DashboardCard
              icon={null}
              classNames={'bg-white'}
              title={"Closed Fund Raisers"}
              data={fundRaiseStatistics?.fund_raiser?.closedFundRaise || 0}
            />
            <DashboardCard
              icon={null}
              classNames={'bg-white'}
              title={"Pending  Raisers"}
              data={fundRaiseStatistics?.fund_raiser?.pendingFundRaiser || 0}
            />
            <DashboardCard
              icon={null}
              classNames={'bg-white'}
              title={"Total Donations"}
              data={`${fundRaiseStatistics?.donation?.total_donation || 0}${const_data.MONEY_ICON}`}
            />
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

      </AdminLayout>
    </AdminPrivateRouter>

  )
}

export default DashboardPage