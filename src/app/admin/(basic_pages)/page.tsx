"use client"
import AdminLayout from '@/component/Admin/AdminLayout'
import DashboardCard from '@/component/Util/DashboardCard'
import React, { useEffect, useState } from 'react'
import CanvasJSReact from '@canvasjs/react-charts'
import const_data from '@/util/data/const'
import AdminPrivateRouter from '@/component/LoginComponent/AdminPrivateRouter'
import { getFundRaiserStatitics, getBloodStataitic, getBloodByStatics } from '@/util/data/helper/APIHelper'
import { IBloodStatitics, IFundRaiseStatitics } from '@/util/types/API Response/FundRaiser'
import { BloodGroup } from '@/util/types/Enums/BasicEnums'

function DashboardPage(): React.ReactElement {

  const [fundRaiseStatistics, setFundRaiserStatitics] = useState<IFundRaiseStatitics | null>(null)
  const [bloodStatitics, setBloodStatitics] = useState<IBloodStatitics | null>(null)
  const [bloodGroupStatitics, setBloodGroupStatitics] = useState<null | Record<BloodGroup, number>>(null)



  async function statitics() {
    const fundRaiser = await getFundRaiserStatitics();
    const bloodStatitics = await getBloodStataitic();
    if (fundRaiser) {
      setFundRaiserStatitics(fundRaiser)
    }

    if (bloodStatitics) {
      console.log(bloodStatitics);

      setBloodStatitics(bloodStatitics)
    }
  }

  useEffect(() => {
    statitics()
    getBloodByStatics().then((data) => {
      setBloodGroupStatitics(data)
      console.log(data);

    }).catch((err) => {
      console.log(err);

    })
  }, [])

  return (
    <AdminPrivateRouter>
      <AdminLayout onSearch={() => { }}>


        {/* <AdminDateFilter onDateSelect={() => { }}></AdminDateFilter> */}


        <div className='mt-0'>
          <h4 className='font-medium text-2xl'>Blood static&apos;s</h4>
          <div className='grid grid-cols-4 mt-2 gap-5 flex'>
            <DashboardCard icon={null} classNames={'bg-white'} title={"Total donor's"} data={bloodStatitics?.blood_donor?.totalDonors || 0} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"Active donors"} data={bloodStatitics?.blood_donor?.openDonors || 0} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"In active donors"} data={bloodStatitics?.blood_donor?.closedDonors || 0} />

            {
              bloodStatitics?.blood_donor?.donorsByBloodGroup.map((item, index) => {
                return <DashboardCard key={index} icon={null} classNames={'bg-white'} title={`${item._id} Donors`} data={item.count} />
              })
            }

            <DashboardCard icon={null} classNames={'bg-white'} title={"Active blood need"} data={bloodStatitics?.blood_requirement?.openRequests || 0} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"Closed blood need"} data={bloodStatitics?.blood_requirement?.closedRequests || 0} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"Total blood need"} data={bloodStatitics?.blood_requirement?.totalRequests || 0} />
            <DashboardCard icon={null} classNames={'bg-white'} title={"Total unit need"} data={bloodStatitics?.blood_requirement?.totalUnitsNeeded || 0} />
            {
              bloodStatitics?.blood_requirement?.requestsByBloodGroup?.map((item) => {
                return <DashboardCard key={item._id} icon={null} classNames={'bg-white'} title={`${item._id}  need`} data={item?.count || 0} />
              })
            }
            {
              bloodStatitics?.blood_requirement?.requestsByStatus?.map((item) => {
                return <DashboardCard key={item._id} icon={null} classNames={'bg-white'} title={`Blood req ${item._id}`} data={item?.count || 0} />
              })
            }
          </div>
        </div>

        <div className='mt-5'>
          <h4 className='font-medium text-2xl'>Fund raiser static&apos;s</h4>
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
            {
              bloodGroupStatitics && (
                Object.keys(bloodGroupStatitics).map((item, index) => {
                  return <DashboardCard key={index} icon={null} classNames={'bg-white'} title={`${item} Group`} data={bloodGroupStatitics[item]} />
                })
              )
            }

          </div>
        </div>

      </AdminLayout>
    </AdminPrivateRouter>

  )
}

export default DashboardPage