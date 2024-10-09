"use client"
import BloodAccountTab from "@/component/Account/AccountTab/BloodAccountTab";
import BloodAccountStart from "@/component/Blood/bloodAccountStart/BloodAccountStart";
import UpdateBloodGroup from "@/component/Blood/bloodAccountStart/UpdateBloodGroup";
import UpdatePersonalDetails from "@/component/Blood/bloodAccountStart/UpdatePersonalDetails";
import ViewDonorProfile from "@/component/Blood/bloodAccountStart/ViewDonorProfile";
import BloodRequirementSingleItem from "@/component/Blood/BloodRequirementSingleItem";
import Header from "@/component/Header/Header";
import PrivateAccountForBlood from "@/component/LoginComponent/PrivateAccountForBlood";
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter";
import BloodReqSlider from "@/component/section/Home/BloodReqSlider";
import BreadCrumb from "@/component/Util/BreadCrumb";
import CustomeConfirmUI from "@/component/Util/ConfirmUI";
import DangerUIConfirm from "@/component/Util/DangerUIConfirm";
import LoadingComponent from "@/component/Util/LoadingComponent";
import LoadingDataNotFoundComponent from "@/component/Util/LoadingDataNotFound";
import ModelHeader from "@/component/Util/Model/ModelHeader";
import StatisticCard from "@/component/Util/StatisticCard";
import { findMyBloodProfile, openBloodAccountStatus } from "@/util/data/helper/APIHelper";
import { userDetailsFromUseSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import { BloodProfile } from "@/util/types/API Response/Blood";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

function BloodProfileOverView() {

    const [isOpen, setOpen] = useState<boolean>(false)
    const [bloodProfile, setBloodProfile] = useState<null | BloodProfile>(null)
    const [bloodDonorDetails, setBloodDonor] = useState(null)
    const session = useSession()
    const [isBloodDonorFormLoading, setBloodDonorFormLoading] = useState(true)


    async function updateBloodProfile() {

        async function onConfirm() {
            const updateProfile = await openBloodAccountStatus(!isOpen);
            if (updateProfile.status) {
                setOpen(!isOpen)
            } else {
                toast.error(updateProfile.msg)
            }
        }

        confirmAlert({
            title: "Are you sure want to update account?",
            message: "update account?",

            customUI: ({ onClose, title }) => {
                if (isOpen) {
                    return (
                        <DangerUIConfirm
                            onClose={onClose}
                            onConfirm={() => {
                                onConfirm()
                                onClose()
                            }}
                            title={"Are you sure want to hide account"}
                        />
                    )
                } else {
                    return (
                        <CustomeConfirmUI
                            onClose={onClose}
                            onConfirm={() => {
                                onConfirm()
                                onClose()
                            }}
                            title={"Are you sure want to open account"}
                        />
                    )
                }
            }
        })

    }


    async function findDonorDetails() {
        try {
            const profile = userDetailsFromUseSession(session, "user");
            const bloodToken = profile.blood_token;
            const token = profile.token;

            if (bloodToken && token) {
                const findBloodDonor = await API_axiosInstance.get(`/blood/get_profile`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        bloodAuthorization: `Bearer ${bloodToken}`
                    }
                });
                const response = findBloodDonor.data;
                console.log(response);

                if (response.status) {
                    const profile = response.data?.profile?.profile;
                    console.log(profile);

                    setBloodDonor(profile)
                }
                console.log(findBloodDonor);

                setBloodDonorFormLoading(false)
            }
        } catch (e) {
            console.log(e);
            setBloodDonorFormLoading(false)
        }
    }

    useEffect(() => {
        findDonorDetails()
        setBloodDonor(null)
    }, [session])

    async function findProfile() {
        const profile = await findMyBloodProfile()
        if (profile.status) {
            setOpen(profile.status == "Open")
        }
        setBloodProfile(profile)
    }

    useEffect(() => {

        findProfile()
    }, [])


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
                                <label className="inline-flex items-center cursor-pointer">
                                    <input onChange={updateBloodProfile} type="checkbox" checked={isOpen} className="sr-only peer" />
                                    <div className="relative w-14 h-7 bg-red-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                            <div className="grid gap-5 grid-cols-3">
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic={bloodProfile?.blood_group || ""} title="Blood group" />
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic={bloodProfile?.donated_blood.toString() || "0"} title="Blood donated" />
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic={bloodProfile?.blood_requirements.toString() || "0"} title="Blood requirements" />
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic={bloodProfile?.expressed_intrest.toString() || "0"} title="Expressed intrest" />
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic={bloodProfile?.status.toString() || "0"} title="Account Status" />
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic={bloodProfile?.matched_profile.toString() || "0"} title="Matched profile" />
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