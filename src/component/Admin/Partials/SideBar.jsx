import React from 'react'
import LinkNav from './NavLinks/LinkNav'
import DropdownLink from './NavLinks/DropdownLink'
import DropDownLinkItem from './NavLinks/DropDownLinkItem'
import { useSession } from 'next-auth/react';

function AdminSideBar({ isShow }) {

    const session = useSession();
    console.log(session);


    const homeSvgIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>

    const settingIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>

    const addFundRaiserSvgIocn = <i class="fa-solid fa-person-circle-plus"></i>
    const manageFundRaiserSvgIcon = <i class="fa-solid fa-users"></i>
    const fundRaiserPaymentSvgIcon = <i class="fa-solid fa-money-bill"></i>

    const addBloodDonorSvgIcon = <i class="fa-solid fa-droplet"></i>
    const addBloodPatientSvgIcon = <i class="fa-solid fa-bed"></i>
    const urgentBloodRequirementSvgIcon = <i class="fa-solid fa-truck-medical"></i>
    const bloodBankIcon = <i class="fa-solid fa-vault"></i>
    const nearest = <i class="fa-solid fa-map"></i>

    const manageTicket = <i class="fa-solid fa-ticket"></i>
    const manageOrganizationSvgIcon = <i class="fa-solid fa-building-shield"></i>
    const viewCalenderSvgIcon = <i class="fa-solid fa-calendar-days"></i>




    return (
        <>
            {isShow &&
                <aside class="flex w-full flex-col w-64 h-screen px-5 pt-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l border-gray-300">
                    <a href="#" className='flex gap-5'>
                        <img class="w-auto h-7" src="https://merakiui.com/images/logo.svg" alt="" />
                        <h4 className='text-medium text-2xl'>Life Link</h4>
                    </a>



                    <div class="flex flex-col justify-between flex-1 mt-6">
                        <nav class="-mx-3 space-y-6 ">

                            <div class="space-y-3 ">
                                <label class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Basic</label>
                                <LinkNav href={"/admin"} icon={homeSvgIcon} isActive={true} isSub={false} title={"Dashboard"} />
                                <LinkNav href={"/admin/site_settings"} icon={settingIcon} isActive={false} isSub={false} title={"Site settings"}></LinkNav>
                            </div>

                            <div class="space-y-3 ">
                                <label class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Fund Raiser</label>
                                <LinkNav href={"/admin/fund_raising/add"} icon={addFundRaiserSvgIocn} isActive={true} isSub={false} title={"Add fund raiser"} />
                                <LinkNav href={"/admin/fund_raising/view"} icon={manageFundRaiserSvgIcon} isActive={false} isSub={false} title={"Manage fund raiser"}></LinkNav>
                                <LinkNav href={"/admin/fund_raising/payments"} icon={fundRaiserPaymentSvgIcon} isActive={false} isSub={false} title={"Manage Payment's"}></LinkNav>
                            </div>

                            <div class="space-y-3 ">
                                <label class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Blood Bank</label>
                                <LinkNav href={"/admin/blood/add-donor"} icon={addBloodDonorSvgIcon} isActive={true} isSub={false} title={"Add donor"} />
                                <LinkNav href={"/admin/blood/add-requirement"} icon={addBloodPatientSvgIcon} isActive={false} isSub={false} title={"Add requirement"}></LinkNav>
                                <LinkNav href={"/admin/blood/blood-requirement"} icon={urgentBloodRequirementSvgIcon} isActive={false} isSub={false} title={"Blood requirements"}></LinkNav>
                                <LinkNav href={"/admin/blood/change-blood-group"} icon={addBloodDonorSvgIcon} isActive={false} isSub={false} title={"Change blood group"}></LinkNav>
                                <LinkNav href={"/admin/blood/blood-bank"} icon={bloodBankIcon} isActive={false} isSub={false} title={"Blood Bank"}></LinkNav>
                                <LinkNav href={"/admin/blood/nearest"} icon={nearest} isActive={false} isSub={false} title={"Nearest donors"}></LinkNav>
                            </div>

                            <div class="space-y-3 ">
                                <label class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Ticket</label>
                                <LinkNav href={"/admin/tickets/manage"} icon={manageTicket} isActive={true} isSub={false} title={"Manage Tickets"} />

                            </div>

                        </nav>
                    </div>
                </aside>
            }
        </>


    )
}

export default AdminSideBar



