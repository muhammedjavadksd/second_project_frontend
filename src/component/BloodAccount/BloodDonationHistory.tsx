
import React, { Fragment } from 'react'
import BloodDonationHistoryCard from '../Blood/BloodDonationHistoryCard'
import EmptyScreen from '../Util/EmptyScreen'
import PaginationSection from '../Util/PaginationSection'
import { findMyBloodDonationHistory } from '@/util/data/helper/APIHelper'
import { IBloodDonate } from '@/util/types/InterFace/UtilInterface'
import { formatDateToMonthNameAndDate } from '@/util/data/helper/utilHelper'

function BloodDonationHistoryProfile() {

    let length = 2
    return (
        <Fragment>
            <div className='mt-5'>
                <PaginationSection
                    api={{
                        renderType: (page: number, limit: number) => {
                            return findMyBloodDonationHistory(page, limit)
                        }
                    }}
                    itemsRender={(items: IBloodDonate[]) => {
                        return (
                            items.length ? (
                                <div className='grid grid-cols-3'>
                                    {
                                        items.map((each: IBloodDonate) => {
                                            return (
                                                <BloodDonationHistoryCard
                                                    patientName={each?.requirement?.patientName}
                                                    certificate={each.certificate} fullName={each?.donor_profile?.full_name} hospitalName={each.requirement?.locatedAt?.hospital_name} unit={each.unit} date={formatDateToMonthNameAndDate(each.meet_expect)} bloodGroup={each?.requirement?.blood_group} />
                                            )
                                        })
                                    }
                                </div>
                            )
                                : <EmptyScreen msg='There no donation history' />
                        )
                    }}
                    paginationProps={{ current_page: 1, currentLimit: 10 }}
                    refresh={null}
                />
            </div>

        </Fragment>
    )
}

export default BloodDonationHistoryProfile