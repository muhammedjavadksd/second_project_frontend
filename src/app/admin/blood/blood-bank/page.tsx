"use client"
import AdminLayout from "@/component/Admin/AdminLayout";
import MatchedDonors from "@/component/Blood/MatchedDonors";
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter";
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb";
import DropDownItem from "@/component/Util/DropdownItem";
import EmptyScreen from "@/component/Util/EmptyScreen";
import PaginationSection from "@/component/Util/PaginationSection";
import { adminFindDonors } from "@/util/data/helper/APIHelper";
import { IBloodDonor } from "@/util/types/API Response/Blood";
import { BloodDonorStatus, BloodGroup } from "@/util/types/Enums/BasicEnums";
import { Fragment, useEffect, useState } from "react";
import { FaList } from "react-icons/fa";


function BloodBank() {

    const [bloodGroup, setBloodGroup] = useState<BloodGroup>(null)
    const [donorStatus, setStatus] = useState<string>(null)
    const [refresh, setRefresh] = useState<boolean>(false)

    useEffect(() => {
        setRefresh(!refresh)
    }, [bloodGroup, donorStatus])

    return (
        <Fragment>
            <AdminPrivateRouter>
                <AdminLayout>
                    <div>
                        <div className="flex justify-between">
                            <div>
                                <AdminBreadCrumb title={"Blood Bank"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Blood Bank", href: "/blood/blood-bank" }]} />
                            </div>
                            <div className="flex items-center gap-3">
                                <button className={`${donorStatus == null ? "bg-blue-900" : 'bg-blue-700'}  text-sm text-white p-2.5 rounded-lg pl-5 pr-5 flex gap-2 items-center`} onClick={() => setStatus(null)} > <FaList /> All donors </button>
                                <button className={`${donorStatus == "true" ? "bg-blue-900" : 'bg-blue-700'}  text-sm text-white p-2.5 rounded-lg pl-5 pr-5 flex gap-2 items-center`} onClick={() => setStatus("true")}> <FaList /> Active only </button>
                                <button className={`${donorStatus == "false" ? "bg-blue-900" : 'bg-blue-700'}  text-sm text-white p-2.5 rounded-lg pl-5 pr-5 flex gap-2 items-center`} onClick={() => setStatus("false")}> <FaList /> In Active only </button>
                                <DropDownItem callBack={(val) => { setBloodGroup(val['value']) }} isOpen={false} optionsType={[{ label: "Find all", value: null }, ...Object.values(BloodGroup).map((each) => { return { label: each, value: each } })]} title="Select blood group" />
                            </div>
                        </div>
                    </div>

                    <PaginationSection
                        api={{
                            renderType: (page: number, limit: number) => {
                                return adminFindDonors(page, limit, bloodGroup, donorStatus)
                            }
                        }}
                        itemsRender={(items: IBloodDonor[]) => {
                            return (

                                (items && items.length) ? (
                                    <>
                                        <div className="grid grid-cols-3 gap-3 mt-5">
                                            {
                                                items.map((donor: IBloodDonor, index: number) => {
                                                    return <MatchedDonors key={index} blockedReason={donor.blocked_reason} status={donor.status} bloodGroup={donor.blood_group} donorId={donor.donor_id} name={donor.full_name} emailAddress={donor.email_address} phoneNumber={donor.phoneNumber} />
                                                })
                                            }
                                        </div>
                                    </>
                                ) : <EmptyScreen msg={"No donor found"} />

                            )
                        }}
                        paginationProps={{ current_page: 1, currentLimit: 10 }}
                        refresh={refresh}
                    >
                    </PaginationSection>


                </AdminLayout>
            </AdminPrivateRouter>
        </Fragment >
    )
}

export default BloodBank