"use client"
import BloodAccountTab from "@/component/Account/AccountTab/BloodAccountTab"
import OutGoingBloodCard from "@/component/Blood/OutGoingBloodCard"
import Header from "@/component/Header/Header"
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter"
import BreadCrumb from "@/component/Util/BreadCrumb"
import EmptyScreen from "@/component/Util/EmptyScreen"
import Footer from "@/component/Util/Footer"
import PaginationSection from "@/component/Util/PaginationSection"
import { findMyBloodrequirement } from "@/util/data/helper/APIHelper"
import { formatDateToMonthNameAndDate } from "@/util/data/helper/utilHelper"
import IBloodReq from "@/util/types/API Response/Blood"
import { BloodStatus } from "@/util/types/Enums/BasicEnums"
import Link from "next/link"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"

function MyRequirements() {

    const [bloodStatus, setStatus] = useState<BloodStatus>(null)
    const [refresh, setRefresh] = useState<boolean>(false)



    return (
        <>
            <UserPrivateRouter>
                <Header />
                <div className="container mx-auto mt-5 mb-5">
                    <div className="mb-5">
                        <BreadCrumb path={['Profile', 'View Profile']} />
                    </div>
                    <BloodAccountTab />
                    <div className="mt-5">
                        <div className="mt-3 flex w-full justify-end mb-3">
                            <Link href={"/blood/request"} className="flex  items-center gap-2  bg-blue-800 px-5 py-2 text-white rounded-md">
                                <FaPlus />
                                Post blood requirement
                            </Link>
                        </div>
                        <div className="mb-4 bg-white shadow-inner border  p-3 flex justify-between items-center">
                            <div>
                                <h4 className="text-2xl font-bold">All your blood request</h4>
                                <p>Listing all your blood requirements</p>
                            </div>
                            <div className="gap-5 flex">
                                <button onClick={() => { setStatus(null), setRefresh(!refresh) }} className="bg-blue-800 px-5 py-2 text-white rounded-md">Show all</button>
                                <button onClick={() => { setStatus(BloodStatus.Pending), setRefresh(!refresh) }} className="bg-green-800 px-5 py-2 text-white rounded-md">Active Only</button>
                                <button onClick={() => { setStatus(BloodStatus.Closed), setRefresh(!refresh) }} className="bg-red-800 px-5 py-2 text-white rounded-md">Closed Only</button>
                            </div>
                        </div>
                        <PaginationSection
                            api={{
                                renderType: async (page: number, limit: number) => {
                                    return await findMyBloodrequirement(page, limit, bloodStatus);
                                }
                            }}
                            itemsRender={(requirement: IBloodReq[]) => {
                                return (
                                    !requirement.length ? (
                                        <EmptyScreen msg="There no requirement from your side" />
                                    ) : (
                                        <div className="grid gap-5 grid-cols-3" >
                                            {
                                                requirement.map((item, index) => {
                                                    return <OutGoingBloodCard key={index} closed_reason={item.close_details?.category} blood_id={item.blood_id} onCloseRequest={() => setRefresh(!refresh)} closed={item.status == BloodStatus.Closed} intrest_submission={item.intrest_submission} deadLine={formatDateToMonthNameAndDate(item.neededAt)} group={item.blood_group} unit={item.unit} />
                                                })
                                            }
                                        </div>

                                    )
                                )
                            }}
                            paginationProps={{
                                current_page: 1,
                                currentLimit: 6
                            }}
                            refresh={refresh}
                        >

                        </PaginationSection>
                    </div>
                </div >
                <Footer />
            </UserPrivateRouter >
        </>
    )
}

export default MyRequirements