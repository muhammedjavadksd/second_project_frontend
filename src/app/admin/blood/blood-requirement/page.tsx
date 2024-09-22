"use client"
import AdminLayout from "@/component/Admin/AdminLayout"
import IncomingBloodCard from "@/component/Blood/IncomingBloodCard"
import SingleIncomingBloodCard from "@/component/Blood/SingleIncomingBloodCard"
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter"
import BloodReqSlider from "@/component/section/Home/BloodReqSlider"
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb"
import DropDownItem from "@/component/Util/DropdownItem"
import { BloodGroup } from "@/util/types/Enums/BasicEnums"
import { Fragment } from "react"


function Page() {
    return (
        <Fragment>
            <AdminPrivateRouter>
                <AdminLayout>
                    <div>
                        <AdminBreadCrumb title={"All blood requirement"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Blood requirement", href: "/blood/blood-reuirement" }]} />
                        <div className="flex justify-between">
                            <div className='buttonGroups flex items-center justify-start mt-3 gap-3' >
                                <button className='bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => { }}> <i className="fa-solid fa-bars" > </i> Approved Only</button >
                                <button className='bg-blue-600 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => { }} > <i className="fa-solid fa-bars" > </i> Pending Only</button >
                                <button className='bg-blue-700 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => { }}> <i className="fa-solid fa-bars" > </i> Rejected Only </button >
                                <button className='bg-blue-700 text-sm text-white p-2 rounded-lg pl-5 pr-5' onClick={() => { }}> <i className="fa-solid fa-bars" > </i> Closed Only </button >
                            </div>
                            <DropDownItem callBack={(val) => { }} isOpen={false} options={['Malayakan', 'English']} title="Select blood group" />
                        </div>

                        <div className="grid grid-cols-3 mt-5 gap-3">
                            <SingleIncomingBloodCard deadLine={new Date().getMilliseconds()} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onDonateBlood={() => { }} unit={"10"} username={"Muhammed Javad"} />
                            <SingleIncomingBloodCard deadLine={new Date().getMilliseconds()} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onDonateBlood={() => { }} unit={"10"} username={"Muhammed Javad"} />
                            <SingleIncomingBloodCard deadLine={new Date().getMilliseconds()} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onDonateBlood={() => { }} unit={"10"} username={"Muhammed Javad"} />
                            <SingleIncomingBloodCard deadLine={new Date().getMilliseconds()} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onDonateBlood={() => { }} unit={"10"} username={"Muhammed Javad"} />
                            <SingleIncomingBloodCard deadLine={new Date().getMilliseconds()} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onDonateBlood={() => { }} unit={"10"} username={"Muhammed Javad"} />
                            <SingleIncomingBloodCard deadLine={new Date().getMilliseconds()} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onDonateBlood={() => { }} unit={"10"} username={"Muhammed Javad"} />
                        </div>
                    </div>
                </AdminLayout>
            </AdminPrivateRouter>
        </Fragment>
    )
}


export default Page