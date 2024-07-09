import AccountTab from '@/_component/Account/AccountTab'
import BloodDonationHistoryCard from '@/_component/Blood/BloodDonationHistoryCard'
import Header from '@/_component/Header/Header'
import BreadCrumb from '@/_component/Util/BreadCrumb'
import React from 'react'

function BloodDonationHistory(): React.ReactElement {
    return (
        <div>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    {
                        <BreadCrumb path={['Profile', 'Blood Donation History']}></BreadCrumb>
                    }
                </div>
            </div>
            <div className="container mx-auto">
                <div className="flex gap-5">
                    <div className='w-1/4'>



                        <AccountTab />

                    </div>
                    <div className='w-4/5'>
                        <div>
                            <h4 className='font-medium text-3xl mb-2'>Hi, Muhammed Javad</h4>
                            <p>Here is your daily activities, and history</p>
                        </div>
                        <div className="mt-5">
                            <div className="grid">

                                <BloodDonationHistoryCard />
                                <BloodDonationHistoryCard />
                                <BloodDonationHistoryCard />
                                <BloodDonationHistoryCard />
                                <BloodDonationHistoryCard />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BloodDonationHistory