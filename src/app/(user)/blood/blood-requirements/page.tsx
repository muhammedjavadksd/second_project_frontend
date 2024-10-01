"use client"
import BloodRequirementSingleItem from '@/component/Blood/BloodRequirementSingleItem'
import Header from '@/component/Header/Header'
import BreadCrumb from '@/component/Util/BreadCrumb'
import DropDownItem from '@/component/Util/DropdownItem'
import EmptyScreen from '@/component/Util/EmptyScreen'
import Footer from '@/component/Util/Footer'
import PaginationSection from '@/component/Util/PaginationSection'
import { getBloodRequirement } from '@/util/data/helper/APIHelper'
import { formatDateToMonthNameAndDate } from '@/util/data/helper/utilHelper'
import IBloodReq from '@/util/types/API Response/Blood'
import { BloodGroup } from '@/util/types/Enums/BasicEnums'
import React, { FunctionComponent, useState } from 'react'


function BloodRequirementsView(): React.ReactElement {

    const [selectedBloodGroup, setBloodGroup] = useState<BloodGroup>(BloodGroup.A_POSITIVE);
    const [refresh, setRefresh] = useState(false)




    return (
        <div>
            <Header />
            <div className='container mx-auto'>
                <div className="mt-3 mb-3">
                    <BreadCrumb path={['Blood', 'Blood Requirements', 'View']} ></BreadCrumb>
                </div>

                <div className="flex mt-3 gap-5 items-center">
                    <DropDownItem isOpen={false} options={Object.values(BloodGroup)} title="Select blood group" callBack={(val) => { setBloodGroup(val), setRefresh(!refresh) }}></DropDownItem>
                </div>

                <div className="mt-5">
                    <PaginationSection
                        api={{
                            renderType: (page: number, limit: number) => {
                                return getBloodRequirement(page, limit, selectedBloodGroup)
                            }
                        }}
                        itemsRender={(items: IBloodReq[]) => {
                            return items && items.length ? (
                                <div className="grid grid-cols-3 gap-y-3 gap-x-5">
                                    {
                                        items.map((each) => {
                                            return (
                                                <BloodRequirementSingleItem
                                                    key={each.blood_id}
                                                    req_id={each.blood_id}
                                                    deadLine={formatDateToMonthNameAndDate(each.neededAt)}
                                                    group={each.blood_group}
                                                    location={each.locatedAt.hospital_name}
                                                    unit={each.unit}
                                                    username={each.patientName}
                                                />
                                            );
                                        })
                                    }
                                </div>
                            ) : <EmptyScreen msg={'No requirement found'} />;
                        }}
                        paginationProps={{ current_page: 1, currentLimit: 10 }}
                        refresh={refresh}
                    >
                    </PaginationSection>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default BloodRequirementsView