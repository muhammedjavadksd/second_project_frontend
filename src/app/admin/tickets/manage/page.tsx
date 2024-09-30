"use client"
import AdminLayout from "@/component/Admin/AdminLayout"
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter"
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb"
import EmptyScreen from "@/component/Util/EmptyScreen"
import PaginationSection from "@/component/Util/PaginationSection"
import TableBody from "@/component/Util/Table/TableBody"
import TableHead from "@/component/Util/Table/TableHead"
import { getAdminTicket } from "@/util/data/helper/APIHelper"
import { formatDateToMonthNameAndDate } from "@/util/data/helper/utilHelper"
import { ProfileTicket } from "@/util/types/API Response/Profile"
import { TicketCategory, TicketStatus } from "@/util/types/Enums/BasicEnums"
import Link from "next/link"
import { Fragment, useEffect, useState } from "react"


function ManageTicket() {

    const [ticketStatus, setStatus] = useState<TicketStatus | null>(null)
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(null);

    function resetFilter() {
        setSearch(null)
        setCategory(null)
        setStatus(null)
    }

    useEffect(() => {
        setRefresh(!refresh)
    }, [ticketStatus, search, category])

    return (
        <Fragment>
            <AdminPrivateRouter>

                <AdminLayout onSearch={(val) => setSearch(val)}>
                    <div>
                        <div>
                            <AdminBreadCrumb title={"Manage tickets"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Manage tickets", href: "/admin/tickets/manage" }]} />
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <div className='buttonGroups flex items-center justify-start mt-3 gap-3' >
                                    <button className={`${!ticketStatus && 'bg-blue-900'} bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5`} onClick={() => setStatus(undefined)} > <i className="fa-solid fa-bars" > </i> All case's</button >
                                    <button className={`${ticketStatus == TicketStatus.Answered ? "bg-blue-900" : "bg-blue-600"} text-sm text-white p-2 rounded-lg pl-5 pr-5`} onClick={() => setStatus(TicketStatus.Answered)} > <i className="fa-solid fa-bars" > </i> Answerd Only</button >
                                    <button className={`${ticketStatus == TicketStatus.Closed ? "bg-blue-900" : "bg-blue-600"} text-sm text-white p-2 rounded-lg pl-5 pr-5`} onClick={() => setStatus(TicketStatus.Closed)}> <i className="fa-solid fa-bars" > </i> Closed Only </button >
                                    <button className={`${ticketStatus == TicketStatus.Raised ? "bg-blue-900" : "bg-blue-600"} text-sm text-white p-2 rounded-lg pl-5 pr-5`} onClick={() => setStatus(TicketStatus.Raised)} > <i className="fa-solid fa-bars" > </i> Rasied Tickets </button >
                                    <button className={`${ticketStatus == TicketStatus.ReOpened ? "bg-blue-900" : "bg-blue-600"} text-sm text-white p-2 rounded-lg pl-5 pr-5`} onClick={() => setStatus(TicketStatus.ReOpened)} > <i className="fa-solid fa-bars" > </i> Reopned Case </button >
                                </div>
                                <div className='buttonGroups flex items-center justify-start mt-3 gap-3' >
                                    <button className={`${!category && 'bg-blue-900'} bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5`} onClick={() => setCategory(null)} > <i className="fa-solid fa-bars" > </i> All</button >
                                    {
                                        Object.values(TicketCategory).map((cate) => {
                                            return (
                                                <button className={`${cate == category ? 'bg-blue-900' : 'bg-blue-600'}  text-sm text-white p-2 rounded-lg pl-5 pr-5`} onClick={() => setCategory(cate)} > <i className="fa-solid fa-bars" > </i> {cate}</button >
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="mt-3">
                                <button onClick={resetFilter} className="flex gap-2  items-center bg-red-600 py-1.5 p-5 rounded-md text-white">
                                    <i className="fa-solid fa-arrows-rotate"></i>
                                    Reset filter</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-5">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">


                            <PaginationSection
                                api={{
                                    renderType: (page: number, limit: number) => {
                                        return getAdminTicket(page, limit, ticketStatus, category, search)
                                    }
                                }}
                                itemsRender={(item: ProfileTicket[]) => {
                                    return (
                                        item && item.length ? (
                                            (

                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                    <TableHead head={['ID', 'Title', 'Category', 'Status', 'Updated Date', 'Action']} />
                                                    {
                                                        item.map((ticket: ProfileTicket) => {
                                                            return <TableBody data={[ticket.ticket_id, ticket.title, ticket.category, ticket.status, formatDateToMonthNameAndDate(ticket.updated_at), <Link className='p-3 px-5 rounded-md text-white bg-blue-600' href={`${ticket.ticket_id}`}>View</Link>]} />
                                                        })
                                                    }
                                                </table>
                                            )
                                        ) : (
                                            <div className="mt-3 inline-table w-full">
                                                <EmptyScreen msg="No ticket fount" />
                                            </div>
                                        )
                                    )
                                }}
                                paginationProps={{ current_page: 1, currentLimit: 10 }}
                                refresh={!!refresh}
                            >

                            </PaginationSection>

                        </div>
                    </div>
                </AdminLayout>
            </AdminPrivateRouter>
        </Fragment >
    )
}

export default ManageTicket