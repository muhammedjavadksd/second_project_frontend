"use client";
import AccountTab from '@/component/Account/AccountTab/ProfileTab'
import Header from '@/component/Header/Header'
import UserPrivateRouter from '@/component/LoginComponent/UserPrivateRouter';
import NewTicketForm from '@/component/Ticket/NewTicket';
import BreadCrumb from '@/component/Util/BreadCrumb'
import Footer from '@/component/Util/Footer'
import ModelHeader from '@/component/Util/Model/ModelHeader';
import ModelItem from '@/component/Util/ModelItem';
import TableBody from '@/component/Util/Table/TableBody';
import TableHead from '@/component/Util/Table/TableHead';
import TablePagination from '@/component/Util/Table/TablePagination';
import TableWrapper from '@/component/Util/TableWrapper';
import { findAllMyTicket } from '@/util/data/helper/APIHelper';
import { formatDateToMonthNameAndDate } from '@/util/data/helper/utilHelper';
import { ProfileTicket } from '@/util/types/API Response/Profile';
import { IPaginatedResponse } from '@/util/types/InterFace/UtilInterface';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function SupportTicket(): React.ReactElement {

    let [isNewTicketOpen, setTicketOpen] = useState<boolean>(false)
    const [listTicket, setTicket] = useState<ProfileTicket[]>([]);
    const [ticketCount, setCount] = useState<number>(0);
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [isLoading, setLoading] = useState(true)

    async function findTicket(page: number, limit: number) {
        try {
            const tickets: IPaginatedResponse<ProfileTicket> = await findAllMyTicket(page, limit)
            setTicket(tickets.paginated)
            setCount(tickets.total_records)
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        findTicket(page, limit)
    }, [limit, page])



    return (
        <UserPrivateRouter>
            <Header />
            <ModelItem ZIndex={10} closeOnOutSideClock={isNewTicketOpen} isOpen={isNewTicketOpen} onClose={() => setTicketOpen(false)} >
                <ModelHeader title={"New Ticket"}></ModelHeader>
                <NewTicketForm onComplete={() => findTicket(page, limit)} state={setTicketOpen} />
            </ModelItem>
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Profile', 'View Profile']} />
                </div>
                <AccountTab />
                <div className="flex gap-5">

                    <div className="w-full mt-5">
                        <div className='flex justify-between items-center'>
                            <div>
                                <h4 className="font-medium text-3xl mb-2">Hi, Muhammed Javad</h4>
                                <p>Here is your daily activities, and history</p>
                            </div>
                            <button onClick={() => setTicketOpen(true)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                <i className="fa-solid fa-plus mr-3"></i>
                                New Ticket
                            </button>
                        </div>
                        <div className="mt-0">

                            <div className="relative p-0 overflow-x-auto sm:rounded-lg">


                                <section className="container px-0 mx-auto">

                                    <div className="flex flex-col mt-6">
                                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">

                                                <TableWrapper isLoading={isLoading} head={['ID', 'Title', 'Category', 'Status', 'Updated Date', 'Action']}>
                                                    <>
                                                        {
                                                            listTicket.map((item) => {
                                                                return (
                                                                    <TableBody key={item.ticket_id} data={[item.ticket_id, item.title, item.category, item.status, formatDateToMonthNameAndDate(item.updated_at),
                                                                    <Link key={item.ticket_id} className='underline text-blue-600' href={`support/${item.ticket_id}`}>View</Link>
                                                                    ]} />
                                                                )
                                                            })
                                                        }

                                                    </>
                                                </TableWrapper>
                                                <TablePagination item_per_page={limit} onClick={(val) => { setPage(val) }} total_records={ticketCount} />

                                            </div>
                                        </div>
                                    </div>


                                </section>
                            </div>


                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </UserPrivateRouter >
    )
}

export default SupportTicket