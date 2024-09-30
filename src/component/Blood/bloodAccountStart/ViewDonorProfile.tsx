import ModelItem from "@/component/Util/ModelItem"
import { useState } from "react"
import UpdateBloodGroup from "./UpdateBloodGroup"
import UpdatePersonalDetails from "./UpdatePersonalDetails"


function ViewDonorProfile({ profile }) {


    const [isBloodGroupChangeOpen, setBloodGroupOpen] = useState<boolean>(false)
    const [isPersonalDetailsOpen, setPersonalDetailsOpen] = useState<boolean>(false)



    return (
        <div className="bg-white overflow-hidden shadow rounded-lg border px-2 min-w-96">


            {/* <ModelItem ZIndex={999} isOpen={isBloodGroupChangeOpen} onClose={() => setBloodGroupOpen(false)}>
                <UpdateBloodGroup onComplete={() => setBloodGroupOpen(false)}></UpdateBloodGroup>
            </ModelItem>

            <ModelItem closeOnOutSideClock={ } ZIndex={999} isOpen={isPersonalDetailsOpen} onClose={() => setPersonalDetailsOpen(false)}>
                <UpdatePersonalDetails onComplete={() => setPersonalDetailsOpen(false)} profile={profile}></UpdatePersonalDetails>
            </ModelItem> */}

            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User Profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    This is some information about the user.
                </p>
            </div>


            <div className="border-t border-gray-200 px-4 py-2 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200 px-2">
                    <div className="sm:py-4 flex sm:grid sm:grid-cols-2 sm:gap-x-4">
                        <dt className="text-sm font-medium text-gray-500">
                            Donor ID
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile?.donor_id}
                            </dd>
                        </dt>
                    </div>

                    <div className="sm:py-4 sm:grid sm:grid-cols-2 sm:gap-x-4">
                        <dt className="text-sm font-medium text-gray-500">
                            Full name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {profile?.full_name}
                        </dd>
                    </div>

                    <div className="sm:py-4 sm:grid sm:grid-cols-2 sm:gap-x-4">
                        <dt className="text-sm font-medium text-gray-500">
                            Phone number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {profile?.phoneNumber}

                        </dd>
                    </div>
                    <div className="sm:py-4 sm:grid sm:grid-cols-2 sm:gap-x-4">
                        <dt className="text-sm font-medium text-gray-500">
                            Email ID
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {profile?.email_address}
                        </dd>
                    </div>


                </dl>
            </div>





        </div>
    )
}

export default ViewDonorProfile