"use client"
import AdminLayout from "@/component/Admin/AdminLayout"
import IncomingBloodCard from "@/component/Blood/IncomingBloodCard"
import BloodRequirementItem from "@/component/Blood/SingleIncomingBloodCard"
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter"
import BloodReqSlider from "@/component/section/Home/BloodReqSlider"
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb"
import DropDownItem from "@/component/Util/DropdownItem"
import PaginationSection from "@/component/Util/PaginationSection"
import { findBloodResponse, searchHealthCenters } from "@/util/data/helper/APIHelper"
import { BloodGroup, BloodStatus } from "@/util/types/Enums/BasicEnums"
import { MapApiResponse } from "@/util/types/InterFace/UtilInterface"
import { useRouter } from "next/navigation"
import { Fragment, useEffect, useState } from "react"
import ReactSelect from "react-select"


function Page() {

    const [selectedBloodGroup, setBloodGroup] = useState<BloodGroup>()
    const [closedOnly, setClosed] = useState<boolean | null>()
    const [status, setStatus] = useState<BloodStatus>()
    const [hospitals, setAllHospitals] = useState<MapApiResponse[]>([])
    const [nearestHospital, setHospitals] = useState<[]>([])
    const [places, setPlaces] = useState<{}[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)
    const router = useRouter();

    function reset() {
        setBloodGroup(null)
        setClosed(null)
        setStatus(null)
    }

    useEffect(() => {
        const data = hospitals.map(function (each) {
            return {
                value: each.display_name,
                label: each.display_name
            }
        });
        setPlaces(data)
        setLoading(false)
    }, [hospitals])

    function searchHospitals(place: string) {
        setLoading(true)
        searchHealthCenters(place).then((data) => {
            setAllHospitals(data)
        }).catch((err) => {
            setLoading(false)
        })
    }


    return (
        <Fragment>
            <AdminPrivateRouter>
                <AdminLayout isSearch={false} onSearch={() => { }}>
                    <div>
                        <div className="flex justify-between items-center">
                            <div>
                                <AdminBreadCrumb title={"All blood requirement"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Blood requirement", href: "/blood/blood-reuirement" }]} />
                            </div>
                            <button className={`flex gap-2 items-center bg-red-600 text-sm text-white p-2 rounded-lg pl-5 pr-5`} onClick={reset}>
                                <i className="fa-solid fa-rotate-right"></i>
                                Reset filter
                            </button >
                        </div>
                        <div className="flex justify-between">
                            <div className='buttonGroups flex items-center justify-start mt-3 gap-3' >
                                <button className={`${closedOnly ? 'bg-blue-800' : 'bg-blue-600'} text-sm text-white p-2 rounded-lg pl-5 pr-5`} onClick={() => { setClosed(!closedOnly) }}> <i className="fa-solid fa-bars" > </i> Closed Only</button >
                                <DropDownItem callBack={(val) => { setStatus(val) }} isOpen={false} options={Object.values(BloodStatus)} title="Select  status" />
                                <DropDownItem callBack={(val) => { setBloodGroup(val) }} isOpen={false} options={Object.values(BloodGroup)} title="Select blood group" />
                            </div>
                            <form action="#" method="GET" className="hidden lg:block lg:pl-2">
                                <label htmlFor="topbar-search" className="sr-only">Search</label>
                                <div className="relative mt-1 lg:w-96">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" /> </svg>
                                    </div>
                                    {/* <SearchSele */}
                                    <ReactSelect isLoading={isLoading} onInputChange={(e) => searchHospitals(e)} isSearchable options={places} className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">

                                    </ReactSelect>
                                    {/* <input onChange={(e) => setHospital(e.target.value)} type="text" name="email" id="topbar-search" className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search by hospital name" /> */}
                                </div>
                            </form>
                        </div>

                        <div className="grid grid-cols-3 mt-5 gap-3">




                            <BloodRequirementItem unit={10} username={null} deadLine={new Date().getMilliseconds()} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onView={() => router.push("blood-requirement/123")} />
                            <BloodRequirementItem unit={10} username={null} deadLine={new Date().getMilliseconds()} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onView={() => router.push("blood-requirement/123")} />
                            <BloodRequirementItem unit={10} username={null} deadLine={new Date().getMilliseconds()} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onView={() => router.push("blood-requirement/123")} />
                            <BloodRequirementItem unit={10} username={null} deadLine={new Date().getMilliseconds()} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onView={() => router.push("blood-requirement/123")} />
                            <BloodRequirementItem unit={10} username={null} deadLine={new Date().getMilliseconds()} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onView={() => router.push("blood-requirement/123")} />
                            <BloodRequirementItem unit={10} username={null} deadLine={new Date().getMilliseconds()} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} onView={() => router.push("blood-requirement/123")} />

                        </div>


                    </div>
                </AdminLayout>
            </AdminPrivateRouter >
        </Fragment >
    )
}


export default Page