"use client"
import AdminLayout from '@/_component/Admin/AdminLayout'
import AdminBreadCrumb from '@/_component/Util/AdminBreadCrumb'
import DashboardCard from '@/_component/Util/DashboardCard'
import { MONEY_ICON } from '@/app/_util/_const/const'
import CanvasJSReact from '@canvasjs/react-charts/canvasjs.react.js'
import React, { useEffect, useState } from 'react'
import { fundRaiserGraph } from './data'
import { useParams } from 'next/navigation'
import { getSingleFundRaisingProfile } from './logic'
import { FundRaiserResponse, AxiosResponse } from '@/types/API Response/FundRaiser'
// import { AxiosResponse } from 'axios'
// import { profile } from 'console'

function FundRaiserDetailView(): React.ReactElement {
    var CanvasJSChart: CanvasJSReact = CanvasJSReact.CanvasJSChart;
    let [fundRaiserProfile, setFundRaiserProfile] = useState<FundRaiserResponse | null>(null)

    let params = useParams();
    const fund_id: string = Array.isArray(params.fund_id) ? params.fund_id[0] : params.fund_id

    async function fetchProfile(): Promise<void> {
        try {
            const profile: AxiosResponse | null = await getSingleFundRaisingProfile(fund_id)
            if (profile.status) {
                const fund_raiser_profile: FundRaiserResponse = profile.data
                setFundRaiserProfile(fund_raiser_profile)
                console.log(fund_raiser_profile);
            } else {
                console.log(profile.data?.msg ?? "Something went wrong");
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])


    return (
        fundRaiserProfile instanceof FundRaiserDetailView ? < AdminLayout >
            <div className='grid grid-cols-2'>
                <div>
                    <AdminBreadCrumb root={{ title: "Dashboard", href: "/" }} title={`Detail view for ${fundRaiserProfile.full_name}`} paths={[{ title: "Manage Fund Raiser's", href: "/" }, { title: "View Fund Raiser", href: "/" }]} />
                </div>

                <div className='buttonGroups flex items-center justify-end gap-3'>
                    <button className='bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5'><i className="fa-solid fa-download"></i> Export </button>
                    <button className='bg-red-700 text-sm text-white p-2 rounded-lg pl-5 pr-5'> Close the case </button>
                    <button className='bg-green-700 text-sm text-white p-2 rounded-lg pl-5 pr-5'> Verify Case </button>

                </div>
            </div>
            <div className='flex mt-5 gap-5'>
                <div className='w-1/4'>
                    <div className="bg-white shadow-xl rounded-lg py-3">
                        <div className="photo-wrapper p-2">
                            <img className="w-32 h-32 rounded-full mx-auto" src={`${process.env.NEXT_PUBLIC_FUND_RAISE_PATH}/${fundRaiserProfile.picture?.length && fundRaiserProfile.picture[0]}`} alt="John Doe" />
                        </div>
                        <div className="p-2">
                            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{fundRaiserProfile.full_name}</h3>
                            <div className="text-center text-gray-400 text-xs font-semibold">
                                <p>{fundRaiserProfile.category}</p>
                                <span>{fundRaiserProfile.sub_category}</span>
                            </div>
                            <table className="text-xs my-3">
                                <tbody><tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                                    <td className="px-2 py-2">{fundRaiserProfile.full_address}</td>
                                </tr>
                                    <tr>
                                        <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                        <td className="px-2 py-2">{fundRaiserProfile.phone_number}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                        <td className="px-2 py-2">{fundRaiserProfile.email_id}</td>
                                    </tr>
                                </tbody></table>

                            {/* <div className="text-center my-3">
                                <a className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a>
                            </div> */}

                        </div>
                    </div>

                    <a href="#" className="gap-5 mt-5 w-full   bg-white   focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                        <i className="fa-solid fa-pencil"></i>
                        <div className="text-left rtl:text-right w-full">
                            <div className="mb-1 text-xs">Created By</div>
                            <div className="-mt-1 font-sans text-sm font-semibold">{fundRaiserProfile.created_by}</div>
                        </div>
                    </a>
                    <a href="#" className="gap-5 flex mt-5 w-full   bg-white   focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg  items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                        <div className='w-1/6'>
                            <i className="fa-solid fa-phone"></i>
                        </div>
                        <div className='w-5/6'>
                            <div className='text-ellipsis'>
                                <div className="text-left rtl:text-right w-fit">
                                    <div className="mb-1 text-xs">Contact Details</div>
                                    <div className="-mt-1 font-sans text-sm font-semibold">{fundRaiserProfile.phone_number ?? ""}</div>
                                    <div className="-mt-1 font-sans text-sm font-semibold text-ellipsis ">{fundRaiserProfile.email_id ?? ""}</div>
                                </div>
                            </div>
                        </div>
                    </a>




                </div>
                <div className='w-3/4'>
                    <div className='grid grid-cols-3 flex gap-5 '>
                        <DashboardCard title={"Target"} data={`${fundRaiserProfile.amount}${MONEY_ICON}`} />
                        <DashboardCard title={"Collected"} data={`${fundRaiserProfile.collected}${MONEY_ICON}`} />
                        <DashboardCard title={"Deadline"} data={`12/02/2024`} />
                    </div>
                    <div className="mt-5 w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                        <div className="flex justify-between">
                            <div>
                                <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">23,533 {MONEY_ICON}</h5>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">has been collected</p>
                            </div>
                            <div
                                className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                                12%
                                <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                                </svg>
                            </div>
                        </div>

                        <div className='mt-5'>
                            <CanvasJSChart options={fundRaiserGraph}
                            />
                        </div>
                    </div>
                    {/* <div className="mt-5 w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">

                        <div className="gap-5   mt-5 w-full   bg-white   focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg  items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <div>
                                <SliderComponent arrow={false} isGap={false} slidesToScroll={1} slidesToShow={2} dots={false} >

                                    <div className="photo-wrapper w-full">
                                        <img className="w-full h-full " src="https://pbs.twimg.com/media/DrDt4s_UcAAYuDE.jpg" alt="John Doe" />
                                    </div>
                                    <div className="photo-wrapper">
                                        <img className="w-full h-full" src="https://pbs.twimg.com/media/DrDt4s_UcAAYuDE.jpg" alt="John Doe" />
                                    </div>
                                    <div className="photo-wrapper">
                                        <img className="w-full h-full" src="https://pbs.twimg.com/media/DrDt4s_UcAAYuDE.jpg" alt="John Doe" />
                                    </div>
                                    <div className="photo-wrapper">
                                        <img className="w-full h-full" src="https://pbs.twimg.com/media/DrDt4s_UcAAYuDE.jpg" alt="John Doe" />
                                    </div>

                                </SliderComponent>
                            </div>
                        </div>

                    </div> */}



                </div>
            </div>
        </AdminLayout > : <></>
    )
}

export default FundRaiserDetailView