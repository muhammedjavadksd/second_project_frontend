import UpdateBloodGroup from '@/component/Blood/bloodAccountStart/UpdateBloodGroup'
import UpdatePersonalDetails from '@/component/Blood/bloodAccountStart/UpdatePersonalDetails'
import ModelHeader from '@/component/Util/Model/ModelHeader'
import ModelItem from '@/component/Util/ModelItem'
import Link from 'next/link'
import React, { useState } from 'react'

function BloodAccountTab(): React.ReactElement {


    const [isUpdateBloodGroupOpen, openBloodGroupUpdate] = useState<boolean>(false)
    const [isPersonalDetailsOpen, openPersonDetails] = useState<boolean>(false)

    return (
        <div>

            <ModelItem closeOnOutSideClock={true} ZIndex={999} isOpen={isUpdateBloodGroupOpen} onClose={() => openBloodGroupUpdate(false)}>
                <ModelHeader title={"Update Blood Group"} />
                <UpdateBloodGroup onComplete={() => openBloodGroupUpdate(false)}></UpdateBloodGroup>
            </ModelItem>

            <ModelItem closeOnOutSideClock={true} ZIndex={999} isOpen={isPersonalDetailsOpen} onClose={() => openPersonDetails(false)}>
                <ModelHeader title={"Update Personal Details"} />
                <UpdatePersonalDetails onComplete={() => openPersonDetails(false)} profile={{}} />
                {/* <UpdateBloodGroup onComplete={() => openPersonDetails(false)}></UpdateBloodGroup> */}
            </ModelItem>


            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    <li className="me-2">
                        <Link href="/account/blood-account/blood-profile-overview" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Profile Overview</Link>
                    </li>
                    <li className="me-2">
                        <a href="#" onClick={() => openBloodGroupUpdate(true)} className="inline-block p-4  border-b-2 rounded-t-lg active " >Update Blood Group</a>
                    </li>
                    <li className="me-2">
                        <a href="#" onClick={() => openPersonDetails(true)} className="inline-block p-4  border-b-2  rounded-t-lg active ">Update Profile Details</a>
                    </li>
                    <li className="me-2">
                        <Link href="/account/blood-account/my-requirements" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Blood Requests</Link>
                    </li>
                    <li className="me-2">
                        <Link href="/account/blood-account/donation-history" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Donation History</Link>
                    </li>
                    <li className="me-2">
                        <Link href="/account/blood-account/expressed-intrest" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Expressed Interest</Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default BloodAccountTab
