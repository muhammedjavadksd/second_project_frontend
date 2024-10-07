"use client";
import AdminLayout from "@/component/Admin/AdminLayout";
import MatchedDonors from "@/component/Blood/MatchedDonors";
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter";
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb";
import EmptyScreen from "@/component/Util/EmptyScreen";
import HospitalSearch from "@/component/Util/HospitalSearch";
import PaginationSection from "@/component/Util/PaginationSection";
import { adminFindNearestDonor } from "@/util/data/helper/APIHelper";
import { IBloodDonor, INearestDonor } from "@/util/types/API Response/Blood";
import { BloodGroup } from "@/util/types/Enums/BasicEnums";
import { HospitalResponse } from "@/util/types/InterFace/UtilInterface";
import { Fragment, useEffect, useRef, useState } from "react";


function Page() {

    const [selectedPlace, setSelectedPlace] = useState<HospitalResponse>(null)
    const [bloodGroup, setBloodGroup] = useState<BloodGroup>(null)
    const [refresh, setRefresh] = useState<boolean>(null)

    useEffect(() => {
        setRefresh(!refresh);
    }, [bloodGroup, selectedPlace])



    return (
        <Fragment>
            <AdminPrivateRouter>
                <AdminLayout>
                    <AdminBreadCrumb title={"Find nearest"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Find nearest", href: "/blood/nearest" }]} />
                    <div className="max-w-4xl mx-auto p-4">
                        <div className="relative mb-4">
                            <HospitalSearch selectedHospital={(hospital: HospitalResponse) => setSelectedPlace(hospital)} />
                        </div>
                        <PaginationSection
                            api={{
                                renderType: (page, limit) => {
                                    return adminFindNearestDonor(page, limit, selectedPlace, bloodGroup);
                                },
                            }}
                            itemsRender={(items: INearestDonor[]) => {
                                return (
                                    (items && items.length) ? (
                                        <div className="grid grid-cols-2 gap-10">
                                            {items.map((each) => {
                                                return <MatchedDonors place={each.location.hospital_name} distance={each.distance} blockedReason="" bloodGroup={each.blood_group} donorId={each.donor_id} emailAddress={each.email_address} phoneNumber={each.phoneNumber} status={each.status} name={each.full_name} />
                                            })}
                                        </div>
                                    ) : <EmptyScreen msg="No donor found" />
                                )
                            }}
                            paginationProps={{ current_page: 1, currentLimit: 10 }}
                            refresh={refresh}
                        />

                    </div>
                </AdminLayout>
            </AdminPrivateRouter>
        </Fragment>
    )
}

export default Page