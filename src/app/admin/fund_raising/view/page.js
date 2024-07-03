"use client"
import AdminLayout from '@/_component/Admin/AdminLayout'
import AdminBreadCrumb from '@/_component/Util/AdminBreadCrumb'
import AdminDateFilter from '@/_component/Util/AdminDateFilter'
import PaginationTab from '@/_component/Util/PaginationTab'
import TableSimple from '@/_component/Util/TableSimple'
import { MONEY_ICON } from '@/app/_util/_const/const'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getAllFundRaisers, getUserForFundRaise } from '../logic/fund-raiser-logic'

function ViewFundRaising() {

    let [fundRaiserData, setFundRaiserdata] = useState([]);

    async function fetchAllData() {
        try {

            let allFunRaisers = await getAllFundRaisers();
            let allUsers = await getUserForFundRaise();
            console.log(allFunRaisers);
            console.log(allUsers);
        } catch (e) {
            console.log("Error occured");
            console.log(e);
        }

    }
    useEffect(() => {

        fetchAllData()
        // getAllFundRaisers().then((data) => {
        //     // console.log(data);
        //     setFundRaiserdata(data)
        // }).catch((err) => {
        //     console.log(err);
        // })

        // getUserForFundRaise().then((data) => {
        //     console.log(data);
        // }).catch((err) => {
        //     console.log(err);
        // })
    }, [])



    return (
        <AdminLayout>
            <div className='grid grid-cols-2'>
                <div>
                    <AdminBreadCrumb title={"Manage Fund Raiser's"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Fund Raiser's", href: "/fund_raising" }, { title: "View", href: "/admin/fund_raising/view" }]} />
                </div>
                <div className='buttonGroups flex items-center justify-end gap-3'>
                    <button className='bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5'><i class="fa-solid fa-download"></i> Export </button>
                    <button className='bg-blue-700 text-sm text-white p-2 rounded-lg pl-5 pr-5'> + Add Fund Raiser </button>
                </div>
            </div>



            <div className='mt-5'>
                <div className='grid grid-cols-2'>
                    <AdminDateFilter />
                    <div className='buttonGroups flex items-center justify-end gap-3'>
                        <button className='bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5'><i class="fa-solid fa-bars"></i> All case's</button>

                        <button className='bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5'><i class="fa-solid fa-bars"></i> Pending Verification</button>
                        <button className='bg-blue-700 text-sm text-white p-2 rounded-lg pl-5 pr-5'><i class="fa-solid fa-bars"></i> Verified </button>
                        <button className='bg-blue-700 text-sm text-white p-2 rounded-lg pl-5 pr-5'> <i class="fa-solid fa-bars"></i> Closed </button>
                    </div>
                </div>

                <div className='mt-5'>
                    <TableSimple headers={['Raising ID', 'User', 'Target Amount', 'Dead Line', 'Status', 'Action']} data={
                        fundRaiserData.map((each) => {
                            return ({
                                raisingID: each.fund_id,
                                User: <div className='flex justify-center gap-3'>
                                    <img src='https://avatars.githubusercontent.com/u/109150200?s=96&v=4' className='rounded-lg' width={48}></img>
                                    <div className='text-start '>
                                        <h4>Muhammed Javad</h4>
                                        <p>muhammedjavad119144@gmail.com</p>
                                    </div>
                                </div>,
                                raisingID: each.user_id,
                                TargetAmount: `${each.amount}${MONEY_ICON}`,
                                deadLine: "12/04/2023",
                                status: <span className='bg-green-400 p-3 text-sm text-white rounded-lg'>Active</span>,
                                action: <div>
                                    <button className='text-white rounded-lg pl-3 pe-3 bg-blue-500 p-2'><i class="fa-solid fa-eye"></i> View</button>
                                </div>
                            })
                        })}
                    />
                    <PaginationTab />
                </div>
            </div>
        </AdminLayout>
    )
}

export default ViewFundRaising