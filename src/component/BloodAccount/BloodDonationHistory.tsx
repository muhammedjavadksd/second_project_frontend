
import React, { Fragment } from 'react'
import BloodDonationHistoryCard from '../Blood/BloodDonationHistoryCard'

function BloodDonationHistoryProfile() {
    return (
        <Fragment>



            <div className='mt-5'>
                <div className="grid grid-cols-3 gap-10">
                    <BloodDonationHistoryCard />
                    <BloodDonationHistoryCard />
                    <BloodDonationHistoryCard />
                </div>
            </div>

        </Fragment>
    )
}

export default BloodDonationHistoryProfile