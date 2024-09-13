"use client";
import AccountTab from '@/component/Account/AccountTab/ProfileTab'
import Header from '@/component/Header/Header'
import UserPrivateRouter from '@/component/LoginComponent/UserPrivateRouter';
import NewTicketForm from '@/component/Ticket/NewTicket';
import BreadCrumb from '@/component/Util/BreadCrumb'
import Footer from '@/component/Util/Footer'
import ModelHeader from '@/component/Util/Model/ModelHeader';
import ModelItem from '@/component/Util/ModelItem';
import TableSimple from '@/component/Util/TableSimple';
import { findAllMyTicket } from '@/util/data/helper/APIHelper';
import { formatDateToMonthNameAndDate } from '@/util/data/helper/utilHelper';
import { ProfileTicket } from '@/util/types/API Response/Profile';
import { TicketCategory, TicketPriority } from '@/util/types/Enums/BasicEnums';
import { IPaginatedResponse } from '@/util/types/InterFace/UtilInterface';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function SupportTicket(): React.ReactElement {

    let [isNewTicketOpen, setTicketOpen] = useState<boolean>(false)
    const [listTicket, setTicket] = useState<ProfileTicket[]>([]);
    const [ticketCount, setCount] = useState<number>(0);

    async function findTicket(page: number, limit: number) {
        try {
            const tickets: IPaginatedResponse<ProfileTicket> = await findAllMyTicket(page, limit)
            setTicket(tickets.paginated)
            setCount(tickets.total_records)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        findTicket(1, 10)
    }, [])



    return (
        <UserPrivateRouter>
            <Header />
            <ModelItem ZIndex={10} closeOnOutSideClock={isNewTicketOpen} isOpen={isNewTicketOpen} onClose={() => setTicketOpen(false)} >
                <ModelHeader title={"New Ticket"}></ModelHeader>
                <div className="bg-white min-w-96 min-h-96 p-5">
                    <NewTicketForm state={setTicketOpen} />
                </div>
            </ModelItem>
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Profile', 'View Profile']} />
                </div>
                <div className="flex gap-5">
                    <div className="w-1/4">
                        <AccountTab />
                    </div>
                    <div className="w-4/5">
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
                        <div className="mt-5">

                            <div className="relative p-5 overflow-x-auto shadow-md sm:rounded-lg">

                                {/* {listTicket[0].updated_at} */}

                                <TableSimple
                                    headers={['ID', 'Title', 'Priority', 'Category', 'Status', 'Updated Date']}
                                    searchKeys={['title']}
                                    data={listTicket}
                                    keyIndex={
                                        [
                                            {
                                                as: (children) => children,
                                                key: "ticket_id"
                                            },
                                            {
                                                as: (title, ticket_id) => <Link href={`support/${ticket_id}`}>{title}</Link>,
                                                key: ["title", "ticket_id"]
                                            },
                                            {
                                                as: (children) => children,
                                                key: "priority"
                                            },
                                            {
                                                as: (children) => children,
                                                key: "category"
                                            },
                                            {
                                                as: (children) => (
                                                    <span className='bg-green-400 text-white rounded-lg px-3 py-2'>
                                                        {children}
                                                    </span>
                                                ),
                                                key: "status"
                                            },
                                            {
                                                as: (children) => formatDateToMonthNameAndDate(children),
                                                key: "updated_at"
                                            },
                                        ]
                                    }
                                />


                                {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                ID
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Priority
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Category
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Updated Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listTicket.map((item: ProfileTicket) => {
                                                return (
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td>
                                                            #{item.ticket_id}
                                                        </td>
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            <Link className='underline text-blue-500' href={`support/${item.ticket_id}`}>
                                                                {item.title}
                                                            </Link>
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {item.priority}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {item.category}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className='bg-green-400 text-white rounded-lg px-3 py-2'>
                                                                {item.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {formatDateToMonthNameAndDate(item.updated_at)}
                                                        </td>

                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table> */}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </UserPrivateRouter >
    )
}

export default SupportTicket