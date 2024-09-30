"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ImageModel from '../../Util/ImageModel'
import ModelItem from '../../Util/ModelItem'
import BloodAccountStart from '../../Blood/bloodAccountStart/BloodAccountStart'
import { userDetailsFromUseSession } from '@/util/data/helper/authHelper'
import LoadingComponent from '../../Util/LoadingComponent'
import API_axiosInstance from '@/util/external/axios/api_axios_instance'
import Link from 'next/link'

function Profil(): React.ReactElement {

    const router = useRouter()
    const params = useSearchParams();
    const open_donor_model = params.get("open_donor_model");
    const [isBloodAccountStart, setBloodAccountStart] = useState<boolean>(!!open_donor_model);


    return (
        <div>

            <ModelItem closeOnOutSideClock={false} ZIndex={1} isOpen={isBloodAccountStart} onClose={() => setBloodAccountStart(false)}>
                {isBloodAccountStart ? "s" : "n"}
                <BloodAccountStart onComplete={() => setBloodAccountStart(false)}></BloodAccountStart>
            </ModelItem>

            {/* <h2>Profile editing</h2> */}
            <div className=" w-full bg-white rounded-lg p-2">
                <ul className="space-y-4 text-sm font-medium text-gray-600">
                    <li>
                        <Link href="/account/profile" className="flex items-center px-4 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300">
                            <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            Profile
                        </Link>
                    </li>






                    <li>
                        <Link href="/account/support" className="flex items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-200 text-gray-800 transition-colors duration-300">
                            <i className="fa-solid fa-headset mr-3"></i>
                            Support  & Ticket
                        </Link>
                    </li>

                    <li>
                        <Link href="/account/chat" className="flex items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-200 text-gray-800 transition-colors duration-300">
                            <i className="fa-regular fa-comment mr-3"> </i>
                            Messages
                        </Link>
                    </li>

                    <li>
                        <a href="#" onClick={() => {
                            signOut({ redirect: false }).then(() => {
                                router.replace("/auth/sign_in")
                            }).catch((err) => { })
                        }} className="flex items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-200 text-gray-800 transition-colors duration-300">
                            <svg className="w-5 h-5 mr-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7.824 5.937a1 1 0 0 0 .726-.312 2.042 2.042 0 0 1 2.835-.065 1 1 0 0 0 1.388-1.441 3.994 3.994 0 0 0-5.674.13 1 1 0 0 0 .725 1.688Z" />
                                <path d="M17 7A7 7 0 1 0 3 7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V7a5 5 0 1 1 10 0v7.083A2.92 2.92 0 0 1 12.083 17H12a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a1.993 1.993 0 0 0 1.833-1.167A7 7 0 0 0 17 7Zm-6 8h2v-1h-2v1Z" />
                            </svg>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Profil