import UpdateBloodGroup from '@/component/Blood/bloodAccountStart/UpdateBloodGroup'
import UpdatePersonalDetails from '@/component/Blood/bloodAccountStart/UpdatePersonalDetails'
import ModelHeader from '@/component/Util/Model/ModelHeader'
import ModelItem from '@/component/Util/ModelItem'
import { userDetailsFromUseSession } from '@/util/data/helper/authHelper'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import 'react-confirm-alert/src/react-confirm-alert.css';


function BloodAccountTab(): React.ReactElement {

    const [isUpdateBloodGroupOpen, openBloodGroupUpdate] = useState<boolean>(false)
    const [isPersonalDetailsOpen, openPersonDetails] = useState<boolean>(false)
    const session = useSession();
    const userDetails = userDetailsFromUseSession(session, "user");

    const router = useRouter();
    const [currentPath, setPath] = useState(null)

    useEffect(() => {
        setPath(typeof window !== 'undefined' ? window.location.pathname : '')
    }, [])

    return (
        <div>

            <ModelItem closeOnOutSideClock={true} ZIndex={999} isOpen={isUpdateBloodGroupOpen} onClose={() => openBloodGroupUpdate(false)}>
                <ModelHeader title={"Update Blood Group"} />
                <UpdateBloodGroup onComplete={() => openBloodGroupUpdate(false)}></UpdateBloodGroup>
            </ModelItem>

            <ModelItem closeOnOutSideClock={true} ZIndex={999} isOpen={isPersonalDetailsOpen} onClose={() => openPersonDetails(false)}>
                <ModelHeader title={"Update Blood Profile"} />
                <UpdatePersonalDetails onComplete={() => openPersonDetails(false)} loadData={isPersonalDetailsOpen} />
            </ModelItem>


            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    <li className="me-2">
                        <Link
                            href="/account/blood-account"
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${currentPath === '/account/blood-account' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}>
                            Profile Overview
                        </Link>
                    </li>
                    {userDetails.blood_token && (
                        <li className="me-2">
                            <a
                                href="#"
                                onClick={() => openBloodGroupUpdate(true)}
                                className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                                Update Blood Group
                            </a>
                        </li>
                    )}
                    {userDetails.blood_token && (
                        <li className="me-2">
                            <a
                                href="#"
                                onClick={() => openPersonDetails(true)}
                                className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                                Update Blood Profile
                            </a>
                        </li>
                    )}
                    <li className="me-2">
                        <Link
                            href="/account/blood-account/my-requirements"
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${currentPath === '/account/blood-account/my-requirements' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}>
                            Blood Requests
                        </Link>
                    </li>
                    <li className="me-2">
                        <Link
                            href="/account/blood-account/donation-history"
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${currentPath === '/account/blood-account/donation-history' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}>
                            Donation History
                        </Link>
                    </li>
                    <li className="me-2">
                        <Link
                            href="/account/blood-account/expressed-intrest"
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${currentPath === '/account/blood-account/expressed-intrest' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}>
                            Expressed Interest
                        </Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default BloodAccountTab
