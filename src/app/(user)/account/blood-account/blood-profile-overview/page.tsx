"use client"
import BloodAccountTab from "@/component/Account/AccountTab/BloodAccountTab";
import BloodAccountStart from "@/component/Blood/bloodAccountStart/BloodAccountStart";
import UpdateBloodGroup from "@/component/Blood/bloodAccountStart/UpdateBloodGroup";
import UpdatePersonalDetails from "@/component/Blood/bloodAccountStart/UpdatePersonalDetails";
import BloodRequirementSingleItem from "@/component/Blood/BloodRequirementSingleItem";
import Header from "@/component/Header/Header";
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter";
import BloodReqSlider from "@/component/section/Home/BloodReqSlider";
import BreadCrumb from "@/component/Util/BreadCrumb";
import ModelHeader from "@/component/Util/Model/ModelHeader";
import StatisticCard from "@/component/Util/StatisticCard";
import { Fragment } from "react";

function BloodProfileOverView() {
    return (
        <Fragment>
            <UserPrivateRouter>
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
                                        Your'r blood profile is live,
                                    </div>
                                </div>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-14 h-7 bg-red-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                            <div className="grid gap-5 grid-cols-3">
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic="A+" title="Blood group" />
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic="2" title="Blood donated" />
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic="0" title="Blood requirements" />
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic="0" title="Expressed intrest" />
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic="Open" title="Account Status" />
                                <StatisticCard bgClass="bg-gray-100" icon={<i className="fa-solid fa-droplet"></i>} statistic="12+" title="Matched profile" />
                            </div>
                        </div>
                        <div className="w-2/6">
                            <BloodAccountStart onComplete={() => { }} />

                            {/* <UpdatePersonalDetails onComplete={() => { }} profile={{}} /> */}
                            {/* <div className="bg-gray-100">
                                <ModelHeader title={"Update blood group"}></ModelHeader>
                                <UpdateBloodGroup onComplete={() => { }} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </UserPrivateRouter>
        </Fragment >
    )
}

export default BloodProfileOverView