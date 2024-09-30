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
import { FormActionResponse, IPaginatedResponse } from '@/util/types/InterFace/UtilInterface'
import UserResponse from '@/util/types/API Response/UserInterface'
import TableRowCount from '@/component/Util/TableRowCount'
import TableSearch from '@/component/Util/TableSearch'
import { FundRaiserStatus, TableFilterByDate } from '@/util/types/Enums/BasicEnums'
import TableHead from '@/component/Util/Table/TableHead'
import TableBody from '@/component/Util/Table/TableBody'
import LoadImage from '@/component/Util/ImageLoading'
import EmptyScreen from '@/component/Util/EmptyScreen'
import DropDownItem from '@/component/Util/DropdownItem'

function ViewFundRaising(): React.ReactElement {

    const [fundRaiserData, setFundRaiserData] = useState<FundRaiserResponse[]>([]);
    const [tempFundRaiserData, setTempFundRaiserData] = useState<FundRaiserResponse[]>([]);
    const [tableLimit, setTableLimit] = useState<number>(10)
    const [tablePage, setTablePage] = useState<number>(1)
    const [totalRecords, setRecords] = useState<number>(0)
    const [status, setStatus] = useState<FundRaiserStatus>(null)

    const [isCategoryOpen, setCategoryOpen] = useState(false)
    const [isSubCategoryOpen, setSubCategoryOpen] = useState(false)
    const [isStatusOpen, setStatusOpen] = useState(false)

    const [categorySelect, setSelectedCategory] = useState(null)
    const [subCategorySelect, setSelectedSubCategory] = useState(null)
    const [stateSelect, setSelectedState] = useState(null)
    const [urgentSelected, setUrgentSelected] = useState(null)
    const [minPrice, setMin] = useState<string>(null)
    const [maxPrice, setMax] = useState<string>(null)
    const [query, setQuery] = useState<string>(null)



    async function fetchAllData(limit: number, page: number): Promise<void> {
        try {
            let allFundRaisers: IPaginatedResponse<FundRaiserResponse> = await getAllFundRaisers(limit, page, status, query);
            console.log(allFundRaisers)
            if (allFundRaisers.paginated.length) {
                let response = allFundRaisers.paginated;
                setFundRaiserData(response)
                setRecords(allFundRaisers.total_records)
            } else {
                setFundRaiserData([])
                setRecords(0)
            }
        } catch (e) {
            console.log(e);
            return;
        }
    }

    function resetFilter() {
        setSelectedCategory(null)
        setSelectedSubCategory(null)
        setSelectedState(null)
        setUrgentSelected(null)
        setMin("")
        setMax("")
        setStatus(null)
    }

    useEffect((): void => {
        const objectFind: Record<string, any> = {};

        if (subCategorySelect) {
            objectFind.sub_category = subCategorySelect;
        }

        if (categorySelect) {
            objectFind.category = categorySelect;
        }

        if (stateSelect) {
            objectFind.state = stateSelect;
        }

        if (urgentSelected) {
            objectFind.urgency = urgentSelected;
        }
        if (minPrice) {
            objectFind.min = minPrice;
        }
        if (maxPrice) {
            objectFind.max = maxPrice;
        }
        const queryString = new URLSearchParams(objectFind).toString();
        setQuery(queryString || "")

    }, [categorySelect, subCategorySelect, urgentSelected, stateSelect, minPrice, maxPrice])

    useEffect(() => {
        fetchAllData(tableLimit, tablePage)
    }, [query, status])




    return (
        <AdminLayout onSearch={(val: any) => { }}>
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

            <div className='mt-5' >

                <div className="flex mt-3 gap-5 items-center justify-between">
                    <div className="flex gap-2">
                        <DropDownItem isOpen={isStatusOpen} options={Object.values(FundRaiserStatus)} title="Select Status" callBack={(val) => setStatus(val)}></DropDownItem>
                        <DropDownItem isOpen={isCategoryOpen} options={Object.keys(const_data.FUNDRAISER_CATEGORY)} title="Select category" callBack={(val) => setSelectedCategory(val)}></DropDownItem>
                        <DropDownItem isOpen={isSubCategoryOpen} options={categorySelect ? const_data.FUNDRAISER_CATEGORY[categorySelect] : []} title="Select sub category" callBack={(val) => setSelectedSubCategory(val)}></DropDownItem>
                        <DropDownItem isOpen={isSubCategoryOpen} options={['Urgent', 'Not urgent']} title="Select Urgency" callBack={(val) => setUrgentSelected(val)}></DropDownItem>
                        <DropDownItem isOpen={isSubCategoryOpen} options={Object.keys(const_data.STATE_WITH_DISTRICT)} title="Select State" callBack={(val) => setSelectedState(val)}></DropDownItem>
                    </div>
                </div>

                <div className="flex justify-between mt-3 items-center space-x-4">
                    {/* Min Value Input */}
                    <div className='flex gap-5'>
                        <div className="flex flex-col">
                            <input
                                onChange={(e) => setMin(e.target.value)}
                                value={minPrice}
                                type="text"
                                id="min-value"
                                placeholder="Min"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Max Value Input */}
                        <div className="flex flex-col">

                            <input
                                value={maxPrice}
                                onChange={(e) => setMax(e.target.value)}
                                type="text"
                                id="max-value"
                                placeholder="Max"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <button onClick={resetFilter} className="bg-red-500 p-2 py-2 px-4 rounded-lg text-white flex gap-2 items-center">
                        <i className="fa-solid fa-rotate-right"></i>
                        Reset filter
                    </button>
                </div>

                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    {
                        fundRaiserData.length
                            ? (
                                <> <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mt-4">
                                    <TableHead head={['Raising ID', 'Collected amount', 'Target Amount', 'Dead Line', 'Status', 'Action']} />
                                    {
                                        fundRaiserData.map((item) => {
                                            return <TableBody key={item._id} data={[
                                                <span key={1} className='flex items-center gap-3'>
                                                    <div>
                                                        <LoadImage className="w-12 h-12 rounded-full" imageurl={item.picture[0]} />
                                                    </div>
                                                    {item.fund_id}
                                                </span>,
                                                `${item.collected}${const_data.MONEY_ICON}`,
                                                `${item.amount}${const_data.MONEY_ICON}`,
                                                item.deadline,
                                                item.status,
                                                <Link key={item._id} href={`/admin/fund_raising/detail_view/${item.fund_id}`} className='text-white rounded-lg pl-3 pe-3 bg-blue-500 p-2' > <i className="fa-solid fa-eye" > </i> View</Link >]} />
                                        })
                                    }
                                </table>
                                    <PaginationTab item_per_page={tableLimit} onClick={(page: React.SetStateAction<number>) => setTablePage(page)} total_records={totalRecords} />
                                </>) :
                            <div className='mt-3'>
                                <EmptyScreen msg='No data found' />
                            </div>
                    }
                </div>
            </div>
        </AdminLayout >
    )
}

export default ViewFundRaising