"use client"
import FundRaiserAccountTab from '@/component/Account/AccountTab/FundRaiserAccountTab'
import AccountTab from '@/component/Account/AccountTab/ProfileTab'
import BlockModel from '@/component/FundRaiser/BlockModel'
import MyFundRaisingItem from '@/component/FundRaiser/MyFundRaisingItem'
import Header from '@/component/Header/Header'
import BreadCrumb from '@/component/Util/BreadCrumb'
import EmptyScreen from '@/component/Util/EmptyScreen'
import Footer from '@/component/Util/Footer'
import PaginationSection from '@/component/Util/PaginationSection'
import { findMyProfile } from '@/util/data/helper/APIHelper'
import { userDetailsFromUseSession } from '@/util/data/helper/authHelper'
import API_axiosInstance from '@/util/external/axios/api_axios_instance'
import { FundRaiserResponse } from '@/util/types/API Response/FundRaiser'
import { FundRaiserStatus } from '@/util/types/Enums/BasicEnums'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'

function MyFundRaising(): React.ReactElement {

    let [status, setStatus] = useState<FundRaiserStatus>(null);
    let [refresh, setRefresh] = useState<boolean>(true);
    // const [allMyProfile, setAllMyProfile] = useState(null);

    return (
        <>
            <Header />
            {/* <BlockModel /> */}
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Home', 'Profile', 'My Fund Raising']} />
                </div>
                <div>
                    <FundRaiserAccountTab />

                    <div className='mt-3  flex justify-end'>
                        <Link href={"/fund-raising/create"} className="bg-blue-800 px-5 py-2 text-white rounded-md">Create new Fund Raising </Link>
                    </div>
                    <div className="mb-4 mt-5 bg-white shadow-inner border  p-3 flex justify-between items-center">
                        <div>
                            <h4 className="text-2xl font-bold">My Fund Raising</h4>
                            <p>Manage you'r fund raising post</p>
                        </div>
                        <div className="gap-5 flex">
                            <button onClick={() => { setStatus(null), setRefresh(!refresh) }} className="bg-blue-800 px-5 py-2 text-white rounded-md">Show all</button>
                            <button onClick={() => { setStatus(FundRaiserStatus.APPROVED), setRefresh(!refresh) }} className="bg-green-800 px-5 py-2 text-white rounded-md">Approved Only</button>
                            <button onClick={() => { setStatus(FundRaiserStatus.CLOSED), setRefresh(!refresh) }} className="bg-red-700 px-5 py-2 text-white rounded-md">Closed Only</button>
                            <button onClick={() => { setStatus(FundRaiserStatus.CREATED), setRefresh(!refresh) }} className="bg-yellow-800 px-5 py-2 text-white rounded-md">Created only</button>
                        </div>
                    </div>


                    <div className="w-full">
                        <PaginationSection
                            api={{
                                renderType: (page, limit, args) => {
                                    return findMyProfile(limit, page, status)
                                }
                            }}
                            itemsRender={(profile: FundRaiserResponse[]) => {
                                return !profile.length ? (
                                    <EmptyScreen msg='No fund raiser post found'></EmptyScreen>
                                ) : profile.map((prfl, index) => {
                                    return <MyFundRaisingItem profile={prfl} key={index} />
                                })
                            }}
                            paginationProps={{
                                current_page: 1,
                                currentLimit: 10
                            }}
                            refresh={refresh}
                        />
                    </div>
                </div>
            </div >
            <Footer />

        </>
    )
}

export default MyFundRaising