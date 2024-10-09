"use client"
import AdminLayout from "@/component/Admin/AdminLayout"
import IncomingBloodCard from "@/component/Blood/IncomingBloodCard"
import BloodRequirementItem from "@/component/Blood/SingleIncomingBloodCard"
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter"
import BloodReqSlider from "@/component/section/Home/BloodReqSlider"
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb"
import DropDownItem from "@/component/Util/DropdownItem"
import EmptyScreen from "@/component/Util/EmptyScreen"
import HospitalSearch from "@/component/Util/HospitalSearch"
import PaginationSection from "@/component/Util/PaginationSection"
import { findBloodResponse, findPaginatedBloodRequirement, searchHealthCenters } from "@/util/data/helper/APIHelper"
import { formatDateToMonthNameAndDate } from "@/util/data/helper/utilHelper"
import IBloodReq from "@/util/types/API Response/Blood"
import { BloodGroup, BloodStatus } from "@/util/types/Enums/BasicEnums"
import { IOptionLabel, MapApiResponse, SelectedHospital } from "@/util/types/InterFace/UtilInterface"
import { useRouter } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import ReactSelect from "react-select"


function Page() {

    const [selectedBloodGroup, setBloodGroup] = useState<BloodGroup>()
    const [closedOnly, setClosed] = useState<boolean | null>()
    const [status, setStatus] = useState<IOptionLabel>()
    const [hospitals, setAllHospitals] = useState<MapApiResponse[]>([])
    const [nearestHospital, setHospitals] = useState<[]>([])
    const [places, setPlaces] = useState<{}[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<boolean>(false)
    const [hospital, setHospital] = useState<SelectedHospital>(null)
    const router = useRouter();
    const hospitalRef = useRef();

    function reset() {
        setBloodGroup(null)
        setClosed(null)
        setStatus(null)
        setRefresh(!refresh)
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
                                <button className={`${closedOnly ? 'bg-blue-800' : 'bg-blue-600'} text-sm text-white p-2 rounded-lg pl-5 pr-5`} onClick={() => { setClosed(!closedOnly), setRefresh(!refresh) }}> <i className="fa-solid fa-bars" > </i> Closed Only</button >
                                <DropDownItem callBack={(val) => { setStatus(val), setRefresh(!refresh) }} isOpen={false} optionsType={[{ label: "All", value: null }, { label: "Approved", value: BloodStatus.Approved }, { label: "Pending", value: BloodStatus.Pending }]} title="Select  status" />
                                <DropDownItem callBack={(val) => { setBloodGroup(val), setRefresh(!refresh) }} isOpen={false} options={Object.values(BloodGroup)} title="Select blood group" />
                            </div>
                            <HospitalSearch searchRef={hospitalRef} selectedHospital={(hsptl) => { setHospital(hsptl), setRefresh(!refresh) }} />
                        </div>




                        <PaginationSection
                            api={{
                                renderType: (page: number, limit: number) => {
                                    return findPaginatedBloodRequirement(page, limit, status ? status.value as BloodStatus : null, closedOnly, selectedBloodGroup, hospital);
                                }
                            }}
                            itemsRender={(items: IBloodReq[]) => {
                                return (items && items.length) ? (
                                    <div className="grid grid-cols-3 mt-5 gap-3">
                                        {
                                            items.map((each, index) => {
                                                return (
                                                    <BloodRequirementItem key={index} unit={each.unit} username={each.patientName} deadLine={formatDateToMonthNameAndDate(new Date(each.neededAt))} group={each.blood_group} location={each.locatedAt.hospital_name} onView={() => router.push(`blood-requirement/${each.blood_id}`)} />
                                                )
                                            })
                                        }
                                    </div>
                                ) : <EmptyScreen msg={'No blood requirement found'} />
                            }}
                            paginationProps={{ current_page: 1, currentLimit: 10 }}
                            refresh={refresh}
                        >

                        </PaginationSection>



                    </div>
                </AdminLayout>
            </AdminPrivateRouter >
        </Fragment >
    )
}


export default Page