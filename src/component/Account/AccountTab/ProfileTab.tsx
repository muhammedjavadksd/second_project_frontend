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
                        <a href="#" className="flex items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-200 text-gray-800 transition-colors duration-300">
                            <svg className="w-5 h-5 mr-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                            </svg>
                            Dashboard
                        </a>
                    </li>

                    <li>
                        <a href="#" className="flex items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-200 text-gray-800 transition-colors duration-300">
                            <svg className="w-5 h-5 mr-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                            </svg>
                            Settings
                        </a>
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