
import React, { Fragment } from 'react'
import StatisticCard from '../Util/StatisticCard'
import DashboardCard from '../Util/DashboardCard'
import ViewDonorProfile from '../Blood/bloodAccountStart/ViewDonorProfile'
import NotificationItem from '../Util/NotificationItem'
import IncomingBloodCard from '../Blood/IncomingBloodCard'
import { BloodGroup } from '@/util/types/Enums/BasicEnums'

function BloodProfile() {
    return (
        <Fragment>
            <div className="grid gap-10 grid-cols-4 mt-5">
                <DashboardCard classNames={"bg-gray-100 shadow-inner"} icon={<i className="fa-solid fa-droplet"></i>} data={"A+"} title={'Blood Group'}></DashboardCard>
                <DashboardCard classNames={"bg-gray-100 shadow-inner"} icon={<i className="fa-solid fa-droplet"></i>} data={"10"} title={'Blood Donated'}></DashboardCard>
                <DashboardCard classNames={"bg-gray-100 shadow-inner"} icon={<i className="fa-solid fa-droplet"></i>} data={"2"} title={'Blood Required'}></DashboardCard>
                <DashboardCard classNames={"bg-gray-100 shadow-inner"} icon={<i className="fa-solid fa-droplet"></i>} data={"5"} title={'Certificates'}></DashboardCard>
            </div>


            <div className='mt-5'>
                <div className='bloodProile'>
                    <div className="gap-10 grid grid-cols-3">
                        <ViewDonorProfile profile={{ donor_id: "DONOR123", full_name: "Muhammed Javad", status: "Open", phoneNumber: "9744727684", email_address: "muhammedjavad119144@gmail.com" }} />
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg ">
                            <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 rounded-t-lg">
                                <h2 className="text-lg font-semibold text-gray-700">Notifications</h2>
                            </div>
                            <div className="px-4 py-2">
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default BloodProfile