"use client"
import AdminLayout from "@/component/Admin/AdminLayout"
import BloodChangeItem from "@/component/Blood/BloodGroupChangerequestItem"
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter"
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb"
import EmptyScreen from "@/component/Util/EmptyScreen"
import PaginationSection from "@/component/Util/PaginationSection"
import { getBloodGroupChangeRequest } from "@/util/data/helper/APIHelper"
import { IBloodGroupUpdateTemplate } from "@/util/types/API Response/Blood"
import { BloodGroupUpdateStatus } from "@/util/types/Enums/BasicEnums"
import { useState } from "react"


function ChangeBloodGroup() {


    const [status, setStatus] = useState<BloodGroupUpdateStatus>(BloodGroupUpdateStatus.Completed)
    const [refresh, setRefresh] = useState<boolean>(false)


    return (
        <AdminPrivateRouter>
            <AdminLayout>
                <AdminBreadCrumb title={"Change blood group"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Blood Group Change", href: "/blood/change-blood-grou[" }]} />
                <div className='buttonGroups flex items-center justify-start mt-3 gap-3' >
                    <button className={`${status == BloodGroupUpdateStatus.Completed ? 'bg-blue-800' : 'bg-blue-600'}  text-sm text-white p-2 rounded-lg pl-5 pr-5`} onClick={() => { setStatus(BloodGroupUpdateStatus.Completed), setRefresh(!refresh) }}> <i className="fa-solid fa-bars" > </i> Approved Only</button >
                    <button className={`${status == BloodGroupUpdateStatus.Pending ? 'bg-blue-800' : 'bg-blue-600'} text-sm text-white p-2 rounded-lg pl-5 pr-5`} onClick={() => { setStatus(BloodGroupUpdateStatus.Pending), setRefresh(!refresh) }} > <i className="fa-solid fa-bars" > </i> Pending Only</button >
                    <button className={`${status == BloodGroupUpdateStatus.Rejected ? 'bg-blue-800' : 'bg-blue-600'} text-sm text-white p-2 rounded-lg pl-5 pr-5`} onClick={() => { setStatus(BloodGroupUpdateStatus.Rejected), setRefresh(!refresh) }}> <i className="fa-solid fa-bars" > </i> Rejected Only </button >
                </div>


                <PaginationSection
                    paginationProps={{ current_page: 1, currentLimit: 10 }}
                    refresh={refresh}
                    api={{
                        renderType: (page: number, limit: number) => {
                            return getBloodGroupChangeRequest(page, limit, status);
                        }
                    }}
                    itemsRender={(items: IBloodGroupUpdateTemplate[]) => {
                        return (
                            (items && items.length) ? (
                                <div className="grid grid-cols-3 mt-3 gap-3">
                                    {
                                        items.map((each, index) => {
                                            return <BloodChangeItem key={index} req_id={each._id} certificate={each.certificate} currentStatus={each.status} bloodGroup={each.donor.blood_group} date={each.date} name={each.donor.full_name} newGroup={each.new_group} />
                                        })
                                    }
                                </div>
                            ) : (
                                <div className="w-full mt-3">
                                    <EmptyScreen msg={`No ${status} data found`} />
                                </div>
                            )
                        )
                    }}
                >
                </PaginationSection>
            </AdminLayout>
        </AdminPrivateRouter >
    )
}

export default ChangeBloodGroup