
import React, { Fragment } from 'react'
import BloodDonationHistoryCard from '../Blood/BloodDonationHistoryCard'
import EmptyScreen from '../Util/EmptyScreen'

function BloodDonationHistoryProfile() {

    let length = 0
    return (
        <Fragment>
            <div className='mt-5'>
                {
                    length ?
                        <div className="grid grid-cols-3 gap-10">
                            {
                                Array.from({ length }).map((_) => {
                                    return <BloodDonationHistoryCard />
                                })
                            }
                        </div>
                        : <EmptyScreen msg='No donation history found'></EmptyScreen>
                }
            </div>

        </Fragment>
    )
}

export default BloodDonationHistoryProfile