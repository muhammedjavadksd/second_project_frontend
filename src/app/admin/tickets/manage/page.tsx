"use client"
import AdminLayout from "@/component/Admin/AdminLayout"
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter"
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb"
import TableBody from "@/component/Util/Table/TableBody"
import TableHead from "@/component/Util/Table/TableHead"
import Link from "next/link"
import { Fragment } from "react"


function ManageTicket() {
    return (
        <Fragment>
            <AdminPrivateRouter>
                <AdminLayout>
                    <div>
                        <div>
                            <AdminBreadCrumb title={"Manage tickets"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Manage tickets", href: "/admin/tickets/manage" }]} />
                        </div>
                        <div className='buttonGroups flex items-center justify-start mt-3 gap-3' >
                            <button className='bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => { }} > <i className="fa-solid fa-bars" > </i> All case's</button >
                            <button className='bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => { }} > <i className="fa-solid fa-bars" > </i> Initiated Cases</button >
                            <button className='bg-blue-700 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => { }}> <i className="fa-solid fa-bars" > </i> Closed Cased </button >
                            <button className='bg-blue-700 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => { }} > <i className="fa-solid fa-bars" > </i> Rejected Case </button >
                            <button className='bg-blue-700 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => { }} > <i className="fa-solid fa-bars" > </i> Approved Case </button >
                        </div>
                    </div>
                    <div className="w-full mt-5">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">

                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">

                                <TableHead head={['ID', 'Title', 'Category', 'Status', 'Updated Date', 'Action']} />
                                <TableBody data={['123', 'Hello world', 'Fund raising', 'Active', 'Today', <Link className='p-3 px-5 rounded-md text-white bg-blue-600' href={`support/12`}>View</Link>]} />
                                <TableBody data={['123', 'Hello world', 'Fund raising', 'Active', 'Today', <Link className='p-3 px-5 rounded-md text-white bg-blue-600' href={`support/12`}>View</Link>]} />
                                <TableBody data={['123', 'Hello world', 'Fund raising', 'Active', 'Today', <Link className='p-3 px-5 rounded-md text-white bg-blue-600' href={`support/12`}>View</Link>]} />
                                <TableBody data={['123', 'Hello world', 'Fund raising', 'Active', 'Today', <Link className='p-3 px-5 rounded-md text-white bg-blue-600' href={`support/12`}>View</Link>]} />
                                <TableBody data={['123', 'Hello world', 'Fund raising', 'Active', 'Today', <Link className='p-3 px-5 rounded-md text-white bg-blue-600' href={`support/12`}>View</Link>]} />
                            </table>
                        </div>
                    </div>
                </AdminLayout>
            </AdminPrivateRouter>
        </Fragment>
    )
}

export default ManageTicket