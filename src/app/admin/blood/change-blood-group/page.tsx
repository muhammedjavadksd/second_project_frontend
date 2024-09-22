"use client"
import AdminLayout from "@/component/Admin/AdminLayout"
import BloodChangeItem from "@/component/Blood/BloodGroupChangerequestItem"
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter"
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb"


function ChangeBloodGroup() {



    return (
        <AdminPrivateRouter>
            <AdminLayout>
                <AdminBreadCrumb title={"Change blood group"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Blood Group Change", href: "/blood/change-blood-grou[" }]} />
                <div className='buttonGroups flex items-center justify-start mt-3 gap-3' >
                    <button className='bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => { }}> <i className="fa-solid fa-bars" > </i> Approved Only</button >
                    <button className='bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => { }} > <i className="fa-solid fa-bars" > </i> Pending Only</button >
                    <button className='bg-blue-700 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => { }}> <i className="fa-solid fa-bars" > </i> Rejected Only </button >
                </div>

                <div className="grid grid-cols-3 mt-3 gap-3">
                    <BloodChangeItem />
                    <BloodChangeItem />
                    <BloodChangeItem />
                    <BloodChangeItem />
                </div>


            </AdminLayout>
        </AdminPrivateRouter>
    )
}

export default ChangeBloodGroup