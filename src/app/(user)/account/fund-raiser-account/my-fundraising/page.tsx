"use client"
import FundRaiserAccountTab from '@/component/Account/AccountTab/FundRaiserAccountTab'
import AccountTab from '@/component/Account/AccountTab/ProfileTab'
import BlockModel from '@/component/FundRaiser/BlockModel'
import MyFundRaisingItem from '@/component/FundRaiser/MyFundRaisingItem'
import Header from '@/component/Header/Header'
import BreadCrumb from '@/component/Util/BreadCrumb'
import Footer from '@/component/Util/Footer'
import PaginationSection from '@/component/Util/PaginationSection'
import { findMyProfile } from '@/util/data/helper/APIHelper'
import { userDetailsFromUseSession } from '@/util/data/helper/authHelper'
import API_axiosInstance from '@/util/external/axios/api_axios_instance'
import { FundRaiserResponse } from '@/util/types/API Response/FundRaiser'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

function MyFundRaising(): React.ReactElement {

    let [showBlockModal, setShowBlockModal] = useState<boolean>(true);
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
                    <div className='mb-3 mt-5  flex justify-between items-center'>
                        <div className='mb-3'>
                            <h2 className='font-medium text-2xl'>My Fund Raising</h2>
                            <p className='text-blue-600'>Manage you'r fund raising post</p>
                        </div>
                        <div>
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create new Fund Raising </button>
                        </div>
                    </div>
                    <div className="w-full">
                        <PaginationSection
                            api={{
                                renderType: (page, limit, args) => {
                                    return findMyProfile(limit, page)
                                }
                            }}
                            itemsRender={(profile: FundRaiserResponse[]) => {
                                return profile.map((prfl) => {
                                    return <MyFundRaisingItem isApproved={false} key={1} />
                                })
                            }}
                            paginationProps={{
                                current_page: 1,
                                currentLimit: 10
                            }}
                            refresh={null}
                        />
                    </div>
                </div>
            </div >
            <Footer />

        </>
    )
}

export default MyFundRaising