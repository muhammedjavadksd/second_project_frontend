import AccountTab from '@/_component/Account/AccountTab'
import FundDonatedHistoryCard from '@/_component/FundRaiser/FundDonatedHistoryCard'
import Header from '@/_component/Header/Header'
import BreadCrumb from '@/_component/Util/BreadCrumb'
import Footer from '@/_component/Util/Footer'
import React from 'react'

function FundDonationHistory() {
    return (
        <>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    {<BreadCrumb path={['Profile', 'View Profile']}></BreadCrumb>}
                </div>
                <div className="flex gap-5">
                    <div className='w-1/4'>
                        <AccountTab />
                    </div>
                    <div className='w-4/5'>
                        <div>
                            <h4 className='font-medium text-3xl mb-2'>Hi, Muhammed Javad</h4>
                            <p>Here is your daily activities, and Fund Donation Histroy</p>
                        </div>
                        <FundDonatedHistoryCard />
                        <FundDonatedHistoryCard />
                        <FundDonatedHistoryCard />

                    </div>
                </div>
            </div>
            <Footer/>
        </>

    )
}

export default FundDonationHistory