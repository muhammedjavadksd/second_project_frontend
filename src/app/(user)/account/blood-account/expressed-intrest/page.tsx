"use client"
import BloodAccountTab from "@/component/Account/AccountTab/BloodAccountTab"
import ExpressIntrestItem from "@/component/Blood/BloodAccountTabItems/ExpressedIntrest"
import Header from "@/component/Header/Header"
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter"
import BreadCrumb from "@/component/Util/BreadCrumb"
import EmptyScreen from "@/component/Util/EmptyScreen"
import Footer from "@/component/Util/Footer"
import PaginationSection from "@/component/Util/PaginationSection"
import { findMyBloodIntrest } from "@/util/data/helper/APIHelper"
import { formatDateToMonthNameAndDate } from "@/util/data/helper/utilHelper"
import { BloodDonationStatus } from "@/util/types/Enums/BasicEnums"
import { IShowedIntrest } from "@/util/types/InterFace/UtilInterface"
import { useEffect, useState } from "react"

function ExpressedIntrest() {

    const [status, setStatus] = useState<BloodDonationStatus>(null);
    const [refresh, setRefresh] = useState<boolean>(false);



    return (
        <UserPrivateRouter>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Profile', 'View Profile']} />
                </div>
                <BloodAccountTab />
                <div className="mt-5">
                    <div className="mb-4 bg-white shadow-inner border  p-3 flex justify-between items-center">
                        <div>
                            <h4 className="text-2xl font-bold">All your blood request</h4>
                            <p>Listing all your blood requirements</p>
                        </div>
                        <div className="gap-5 flex">
                            <button onClick={() => { setStatus(null), setRefresh(!refresh) }} className="bg-blue-800 px-5 py-2 text-white rounded-md">Show all</button>
                            <button onClick={() => { setStatus(BloodDonationStatus.Approved), setRefresh(!refresh) }} className="bg-green-800 px-5 py-2 text-white rounded-md">Donated Only</button>
                            <button onClick={() => { setStatus(BloodDonationStatus.Pending), setRefresh(!refresh) }} className="bg-yellow-700 px-5 py-2 text-white rounded-md">Upcoming</button>
                            <button onClick={() => { setStatus(BloodDonationStatus.Rejected), setRefresh(!refresh) }} className="bg-red-800 px-5 py-2 text-white rounded-md">Missed</button>
                        </div>
                    </div>

                    <PaginationSection
                        api={{
                            renderType: (page: number, limit: number) => {
                                return findMyBloodIntrest(page, limit, status);
                            }
                        }}
                        itemsRender={(showenIntrest) => {
                            return showenIntrest.length < 1 ?
                                (
                                    <EmptyScreen msg="No intrest expressed from your side" />
                                ) : (
                                    <div className="grid grid-cols-3 gap-10">
                                        {
                                            showenIntrest.map((intrest: IShowedIntrest) => {
                                                return <ExpressIntrestItem key={intrest._id} cords={intrest.requirement.locatedAt.coordinates} meetTime={intrest.meet_expect} blood_group={intrest?.requirement?.blood_group} deadLine={formatDateToMonthNameAndDate(intrest?.requirement?.neededAt)} unit={intrest?.requirement?.unit} />
                                            })
                                        }
                                    </div>
                                )
                        }}
                        paginationProps={{
                            current_page: 1,
                            currentLimit: 6
                        }}
                        refresh={refresh}
                    />
                </div>
            </div>
            <Footer />
        </UserPrivateRouter >
    )
}
export default ExpressedIntrest