"use client";
import BloodAccountTab from '@/component/Account/AccountTab/BloodAccountTab';
import Header from '@/component/Header/Header'
import UserPrivateRouter from '@/component/LoginComponent/UserPrivateRouter';
import BreadCrumb from '@/component/Util/BreadCrumb'
import Footer from '@/component/Util/Footer'
import React from 'react'
import PaginationSection from '@/component/Util/PaginationSection';
import axios from 'axios';

function BloodAccount(): React.ReactElement {



    function itemsRender(item = []) {
        return (
            <>
                {item.map((each) => {
                    return (
                        <div className='bg-red'>
                            {each.id}
                        </div>
                    )
                })}
            </>
        )
    }
    return (
        <UserPrivateRouter>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Profile', 'View Profile']} />
                </div>
                <BloodAccountTab />
                <div>
                    {/* {!<BloodProfile />}
                    {!<IncomingRequestView />}
                    {/* <OutGoingRequestView /> *
                    <BloodDonationHistoryProfile /> */}

                    {/* <PaginationSection
                        paginationProps={{
                            current_page: 1,
                            currentLimit: 10
                        }}
                        api={{
                            apiUrl: "https://dummyjson.com/products?limit=:limit&skip=:skip",
                            axiosHeader: null,
                            axiosInstance: axios.create({ baseURL: null }),
                            dataLabel: "products",
                            limitLabel: ":limit",
                            pageLabel: ":skip"
                        }}
                        itemsRender={itemsRender}
                    /> */}
                </div>


            </div>
            <Footer />
        </UserPrivateRouter >
    )
}


export default BloodAccount