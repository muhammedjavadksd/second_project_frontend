import { signOut } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import ModelItem from '../../Util/ModelItem'
import BloodAccountStart from '../../Blood/bloodAccountStart/BloodAccountStart'
import Link from 'next/link'

function FundRaiserAccountTab(): React.ReactElement {

    const router = useRouter()
    const params = useSearchParams();
    const open_donor_model = params.get("open_donor_model");
    const [isBloodAccountStart, setBloodAccountStart] = useState<boolean>(!!open_donor_model);


    return (
        <div>

            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    <li className="me-2">
                        <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Fund Raiser Profile</a>
                    </li>
                    <li className="me-2">
                        <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">My Fund Raising Post</a>
                    </li>
                    <li className="me-2">
                        <a href="#" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">Fund Donation History</a>
                    </li>

                </ul>
            </div>

        </div>
    )
}

export default FundRaiserAccountTab