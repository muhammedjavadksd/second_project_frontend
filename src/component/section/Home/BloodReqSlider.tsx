import BloodRequirementSingleItem from '@/component/Blood/BloodRequirementSingleItem'
import SectionTitle from '@/component/Util/SectionTitle'
import SliderComponent from '@/component/Util/SliderComponent'
import { getPaginatedBloodReq } from '@/util/data/helper/APIHelper'
import React, { useEffect, useState } from 'react'
import IBloodReq from '@/util/types/API Response/Blood'
import { formatDateToMonthNameAndDate } from '@/util/data/helper/utilHelper'





function BloodReqSlider() {

    //still this error
    //An element access expression should take an argument.ts(1011)
    const [reqList, setReqList] = useState<IBloodReq[]>([])



    useEffect(() => {
        getPaginatedBloodReq(8, 1).then((response) => {
            setReqList(response);
        }).catch((err) => { })
    }, [])



    return (
        <div className=''>

            <SectionTitle title={"Donate your"} focus_text={"blood"} sub_title={"Be the reason for someone's life"}></SectionTitle>
            <SliderComponent arrow={true} isGap={true} slidesToScroll={1} slidesToShow={4} dots={true} >
                {
                    reqList.map((each) => {
                        return (
                            <BloodRequirementSingleItem req_id={each.blood_id} deadLine={formatDateToMonthNameAndDate(each.neededAt)} group={each.blood_group} location={each.address} unit={each.unit} username={each.patientName}></BloodRequirementSingleItem>
                        )
                    })
                }
            </SliderComponent>
        </div>
    )
}

export default BloodReqSlider