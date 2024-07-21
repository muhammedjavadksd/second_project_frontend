"use client"
import AdminLayout from '@/component/Admin/AdminLayout'
import AdminBreadCrumb from '@/component/Util/AdminBreadCrumb'
import AdminDateFilter from '@/component/Util/AdminDateFilter'
import PaginationTab from '@/component/Util/PaginationTab'
import TableSimple from '@/component/Util/TableSimple'
import const_data from '@/util/data/const'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getAllFundRaisers, getUserForFundRaise } from '../logic/fund-raiser-logic'
import { FundRaiserResponse } from '@/util/types/API Response/FundRaiser'
import { FormActionResponse } from '@/util/types/InterFace/UtilInterface'
import UserResponse from '@/util/types/API Response/UserInterface'
import TableRowCount from '@/component/Util/TableRowCount'
import TableSearch from '@/component/Util/TableSearch'

function ViewFundRaising(): React.ReactElement {

    let [fundRaiserData, setFundRaiserdata] = useState<FundRaiserResponse[]>([]);


    async function fetchAllData(limit: number): Promise<void> {
        try {

            let allFundRaisers: FormActionResponse = await getAllFundRaisers(limit, 1);;
            console.log(allFundRaisers);

            if (allFundRaisers.status) {
                let response: FundRaiserResponse[] = allFundRaisers.data;
                let user_ids: string[] = response?.map((each) => each.user_id);
                console.log(user_ids);

                let allUsers: FormActionResponse = await getUserForFundRaise(user_ids);;
                console.log(allUsers);

                if (allUsers.status) {
                    const users: UserResponse[] = allUsers.data;

                    let newMergedData: FundRaiserResponse[] = response?.map((each) => {
                        let indexOfProfile = users.find((profile) => each.user_id == profile.user_id);
                        console.log(indexOfProfile);
                        each.creater_profile = indexOfProfile
                        return each
                    })
                    setFundRaiserdata(newMergedData)
                }
            }
        } catch (e) {
            console.log("Error occured");
            console.log(e);
        }

    }
    useEffect((): void => {
        fetchAllData(10)
    }, [])

    useEffect((): void => {
        console.log(fundRaiserData);
    }, [fundRaiserData])

    function onSearch(val) {
        const regex = new RegExp(`\\b${val}\\b`, 'i');
        // let newData = fundRaiserData.filter(product => regex.test(product))
    }

    function onRowChanges(count) {
        // alert(count)
        fetchAllData(count)
    }

    function onPagination(number) {

    }



    return (
        <AdminLayout>
            <div className='grid grid-cols-2' >
                <div>
                    <AdminBreadCrumb title={"Manage Fund Raiser's"} root={{ title: "Dashboard", href: "/" }
                    } paths={[{ title: "Fund Raiser's", href: "/fund_raising" }, { title: "View", href: "/admin/fund_raising/view" }]} />
                </div>
                < div className='buttonGroups flex items-center justify-end gap-3' >
                    <button className='bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5' > <i className="fa-solid fa-download" > </i> Export </button >
                    <button className='bg-blue-700 text-sm text-white p-2 rounded-lg pl-5 pr-5' > + Add Fund Raiser </button>
                </div>
            </div>



            <div className='mt-5' >
                <div className='grid grid-cols-2'>
                    <AdminDateFilter />
                    <div className='buttonGroups flex items-center justify-end gap-3' >
                        <button className='bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5' > <i className="fa-solid fa-bars" > </i> All case's</button >

                        <button className='bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5' > <i className="fa-solid fa-bars" > </i> Pending Verification</button >
                        <button className='bg-blue-700 text-sm text-white p-2 rounded-lg pl-5 pr-5' > <i className="fa-solid fa-bars" > </i> Verified </button >
                        <button className='bg-blue-700 text-sm text-white p-2 rounded-lg pl-5 pr-5' > <i className="fa-solid fa-bars" > </i> Closed </button >
                    </div>
                </div>

                <div className='mt-5' >
                    <div className='bg-white p-5'>

                        <div className='flex justify-between'>
                            <TableRowCount onRowChanges={onRowChanges} />
                            <TableSearch onSearch={onSearch} />
                        </div>
                        <TableSimple
                            headers={['Raising ID', 'User', 'Target Amount', 'Dead Line', 'Status', 'Action']} data={
                                fundRaiserData.map((each) => {
                                    return ({
                                        raisingID: each.fund_id,
                                        User: (
                                            each.created_by == "USER" ? <div className='flex justify-center gap-3' >
                                                <img src='https://avatars.githubusercontent.com/u/109150200?s=96&v=4' className='rounded-lg' width={48} />
                                                < div className='text-start ' >
                                                    <h4>{each.creater_profile.first_name + each.creater_profile.last_name}</ h4 >
                                                    <p>{each.email_id}</p>
                                                </div>
                                            </div> : (each.created_by == "ADMIN" ? "Created By Admin" : "Created by organization")),
                                        // raisingID: each.user_id,
                                        TargetAmount: `${each.amount}${const_data.MONEY_ICON}`,
                                        deadLine: "12/04/2023",
                                        status: <span className='bg-green-400 p-3 text-sm text-white rounded-lg' > Active </span>,
                                        action: <div>
                                            <Link href={`/admin/fund_raising/detail_view/${each.fund_id}`} className='text-white rounded-lg pl-3 pe-3 bg-blue-500 p-2' > <i className="fa-solid fa-eye" > </i> View</Link >
                                        </div>
                                    })
                                })}
                        />
                        <PaginationTab from={1} to={5} onClick={() => { }} />
                    </div>
                </div>
            </div>
        </AdminLayout >
    )
}

export default ViewFundRaising