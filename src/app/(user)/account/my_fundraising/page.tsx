"use client"
import AccountTab from '@/component/Account/AccountTab'
import BlockModel from '@/component/FundRaiser/BlockModel'
import MyFundRaisingItem from '@/component/FundRaiser/MyFundRaisingItem'
import Header from '@/component/Header/Header'
import BreadCrumb from '@/component/Util/BreadCrumb'
import Footer from '@/component/Util/Footer'
import React, { useState } from 'react'

function MyFundRaising(): React.ReactElement {

    let [showBlockModal, setShowBlockModal] = useState<boolean>(true);

    return (
        <>
            <Header />
            <BlockModel />
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Home', 'Profile', 'My Fund Raising']} />
                </div>
                <div className="flex">
                    <div className='w-1/4'>
                        <AccountTab />
                    </div>
                    <div className='w-4/5'>
                        <div>
                            <div className='flex justify-between items-center'>
                                <div className='mb-3'>
                                    <h2 className='font-medium text-2xl'>My Fund Raising</h2>
                                    <p className='text-blue-600'>Manage you'r fund raising post</p>
                                </div>
                                <div>
                                    <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Stop Raising</button>
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create new Fund Raising </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-3">
                                <MyFundRaisingItem isApproved={false} key={1} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />

        </>
    )
}

export default MyFundRaising