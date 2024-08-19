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
import { FundRaiserStatus, TableFilterByDate } from '@/util/types/Enums/BasicEnums'

function ViewFundRaising(): React.ReactElement {

    const [fundRaiserData, setFundRaiserData] = useState<FundRaiserResponse[]>([]);
    const [tempFundRaiserData, setTempFundRaiserData] = useState<FundRaiserResponse[]>([]);
    const [tableLimit, setTableLimit] = useState<number>(5)
    const [tablePage, setTablePage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(10)
    const [selectedItem, setSelectedItems] = useState<string[]>([])


    async function fetchAllData(limit: number, page: number): Promise<void> {
        try {


            let allFundRaisers: FormActionResponse = await getAllFundRaisers(limit, page);;
            console.log(allFundRaisers);

            if (allFundRaisers.status) {
                let response = allFundRaisers.data;
                const pagination = response?.pagination;
                const profile: FundRaiserResponse[] = response.profiles
                let user_ids: string[] = profile?.map((each) => each.user_id);

                let allUsers: FormActionResponse = await getUserForFundRaise(user_ids);;
                console.log(allUsers);

                if (allUsers.status) {
                    const users: UserResponse[] = allUsers.data ?? [];

                    let newMergedData: FundRaiserResponse[] = profile?.map((each) => {
                        let indexOfProfile = users.find((profile) => each.user_id == profile.user_id);
                        console.log(indexOfProfile);
                        each.creater_profile = indexOfProfile
                        return each
                    })
                    setFundRaiserData(newMergedData)
                    setTempFundRaiserData(newMergedData)
                }
                // setTotalPages(pagination?.total_pages)
            }
        } catch (e) {
            console.log("Error occured");
            console.log(e);
        }

    }
    useEffect((): void => {
        fetchAllData(tableLimit, tablePage)
    }, [])

    function onSearch(val) {
        if (val == "" || val == null) {
            setFundRaiserData(tempFundRaiserData)
        } else {
            const regex = new RegExp(val, 'i');
            let newData = tempFundRaiserData.filter(product => (regex.test(product.creater_profile?.first_name) || regex.test(product.fund_id)))
            setFundRaiserData(newData)
        }
    }

    function onRowChanges(count) {
        if (count < tempFundRaiserData.length) {
            setFundRaiserData(tempFundRaiserData.slice(0, count))
        } else {
            fetchAllData(count, tablePage);
            setTableLimit(count)
        }
    }

    function onPagination(number) {
        setTablePage(number)
        fetchAllData(tableLimit, number)
    }

    function filterFundRaise(status: FundRaiserStatus) {
        if (status == null) {
            const filterData = tempFundRaiserData.slice((tableLimit * (tablePage - 1)), tableLimit);
            setFundRaiserData(filterData)
        } else {
            const filterData = tempFundRaiserData.filter((each) => each.status == status)
            setFundRaiserData(filterData);
        }
    }

    function onDateChange(date: TableFilterByDate) {
        let dateData;
        let todayDate = new Date()
        if (date == TableFilterByDate.AllTime) {
            dateData = tempFundRaiserData.slice((tableLimit * (tablePage - 1)), tableLimit)
        } else {
            if (date == TableFilterByDate.OneMonth) {
                todayDate.setMonth(todayDate.getMonth() - 1)
            } else if (date == TableFilterByDate.OneYear) {
                todayDate.setFullYear(todayDate.getFullYear() - 1)
            } else if (date == TableFilterByDate.SixMonth) {
                todayDate.setMonth(todayDate.getMonth() - 6)
            }
            dateData = tempFundRaiserData.filter((each) => each.created_date < todayDate);
        }
        setFundRaiserData(dateData)
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
                    <Link href={"add"} className='bg-blue-700 text-sm text-white p-2 rounded-lg pl-5 pr-5' > + Add Fund Raiser </Link>
                </div>
            </div>

            {/* 
            {
                "Se" + selectedItem
            } */}

            <div className='mt-5' >
                <AdminDateFilter onDateSelect={onDateChange} />
                <div className='buttonGroups flex items-center justify-start mt-3 gap-3' >
                    <button className='bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => filterFundRaise(null)} > <i className="fa-solid fa-bars" > </i> All case's</button >
                    <button className='bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => filterFundRaise(FundRaiserStatus.INITIATED)} > <i className="fa-solid fa-bars" > </i> Initiated Cases</button >
                    <button className='bg-blue-700 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => filterFundRaise(FundRaiserStatus.CLOSED)}> <i className="fa-solid fa-bars" > </i> Closed Cased </button >
                    <button className='bg-blue-700 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => filterFundRaise(FundRaiserStatus.REJECTED)} > <i className="fa-solid fa-bars" > </i> Rejected Case </button >
                    <button className='bg-blue-700 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => filterFundRaise(FundRaiserStatus.APPROVED)} > <i className="fa-solid fa-bars" > </i> Approved Case </button >
                </div>

                <div className='mt-5' >
                    <div className='bg-white p-5'>

                        <div className='flex justify-between'>
                            <TableRowCount onRowChanges={onRowChanges} />
                            <TableSearch onSearch={onSearch} />
                        </div>
                        <TableSimple
                            onItemChecked={(val) => {
                                const indexOf = selectedItem.indexOf(val);
                                if (indexOf === -1) {
                                    setSelectedItems((prev) => [...prev, val])
                                } else {
                                    const newDocs = [...selectedItem];
                                    newDocs.splice(indexOf, 1)
                                    setSelectedItems(newDocs)
                                }
                            }}
                            onAllItemCheck={(val) => {
                                setSelectedItems(val)
                            }}
                            selectedItem={selectedItem}
                            headers={['Raising ID', 'User', 'Target Amount', 'Dead Line', 'Status', 'Action']}
                            data={
                                fundRaiserData.map((each) => {
                                    return ({
                                        raisingID: each.fund_id,
                                        User: (
                                            each.created_by == "USER" ? <div className='flex justify-center gap-3' >
                                                {/* <img src='https://avatars.githubusercontent.com/u/109150200?s=96&v=4' className='rounded-lg' width={48} /> */}
                                                < div className='text-start ' >
                                                    <h4>{each?.creater_profile?.first_name + each?.creater_profile?.last_name}</ h4 >
                                                    <p>{each?.email_id}</p>
                                                </div>
                                            </div> : (each.created_by == "ADMIN" ? "Created By Admin" : "Created by organization")),
                                        // raisingID: each.user_id,
                                        TargetAmount: `${each.amount}${const_data.MONEY_ICON}`,
                                        deadLine: "12/04/2023",
                                        status: <span className='bg-green-400 p-3 text-sm text-white rounded-lg' > {each.status} </span>,
                                        action: <div>
                                            <Link href={`/admin/fund_raising/detail_view/${each.fund_id}`} className='text-white rounded-lg pl-3 pe-3 bg-blue-500 p-2' > <i className="fa-solid fa-eye" > </i> View</Link >
                                        </div>
                                    })
                                })}
                        />
                        <PaginationTab total_pages={10} total_records={10} from={1} to={totalPages} onClick={(number) => onPagination(number)} />
                    </div>
                </div>
            </div>
        </AdminLayout >
    )
}

export default ViewFundRaising