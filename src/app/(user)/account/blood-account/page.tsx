"use client"
import BloodAccountTab from "@/component/Account/AccountTab/BloodAccountTab";
import BloodAccountToggle from "@/component/Account/BloodAccount/BloodAccountToggle";
import ViewDonorProfile from "@/component/Blood/bloodAccountStart/ViewDonorProfile";
import Header from "@/component/Header/Header";
import PrivateAccountForBlood from "@/component/LoginComponent/PrivateAccountForBlood";
import BreadCrumb from "@/component/Util/BreadCrumb";
import LoadingDataNotFoundComponent from "@/component/Util/LoadingDataNotFound";
import StatisticCard from "@/component/Util/StatisticCard";
import { findDonorDetails } from "@/util/data/helper/APIHelper";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";

function BloodProfileOverView() {

    const [bloodDonorDetails, setBloodDonor] = useState(null)
    const session = useSession()
    const [isBloodDonorFormLoading, setBloodDonorFormLoading] = useState(true)

    useEffect(() => {
        findDonorDetails().then((profile) => {
            if (profile) {
                setBloodDonor(profile)
            }
        }).finally(() => {
            setBloodDonorFormLoading(false)
        })
        setBloodDonor(null)
    }, [session])




    return (
        <Fragment>
            <PrivateAccountForBlood>
                <Header />

                <div className="container mx-auto mt-5 mb-5">
                    <div className="mb-3">
                        <BreadCrumb path={['Home', 'Account', 'Blood Account', 'Profile overview']} />
                    </div>
                    <BloodAccountTab />
                    <div className="mt-5 flex gap-5">
                        <div className="w-4/6">
                            <div className="flex justify-between w-full items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                                <div className="flex">
                                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        <span className="font-medium">Info !</span>
                                        Your blood profile is live,
                                    </div>
                                </div>
                                <BloodAccountToggle isAccountOpen={bloodDonorDetails?.status == "Open"} />
                            </div>
                            <div className="grid gap-5 grid-cols-3">
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic={bloodDonorDetails?.blood_group || ""} title="Blood group" />
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic={bloodDonorDetails?.donated_blood.toString() || "0"} title="Blood donated" />
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic={bloodDonorDetails?.blood_requirements.toString() || "0"} title="Blood requirements" />
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic={bloodDonorDetails?.expressed_intrest.toString() || "0"} title="Expressed intrest" />
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic={bloodDonorDetails?.status.toString() || "0"} title="Account Status" />
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic={bloodDonorDetails?.matched_profile.toString() || "0"} title="Matched profile" />
                            </div>
                        </div>
                        <div className="w-2/6">
                            <div className="h-[420px]">
                                <LoadingDataNotFoundComponent isFound={!!bloodDonorDetails} isLoading={isBloodDonorFormLoading}>
                                    <ViewDonorProfile profile={bloodDonorDetails} />
                                </LoadingDataNotFoundComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </PrivateAccountForBlood>
        </Fragment >
    )
}

export default BloodProfileOverView