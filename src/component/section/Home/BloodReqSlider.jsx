// import BloodRequirementSingleItem from '@/component/Blood/BloodRequirementSingleItem'
// import SectionTitle from '@/component/Util/SectionTitle'
// import SliderComponent from '@/component/Util/SliderComponent'
import BloodRequirementSingleItem from '@/component/Blood/BloodRequirementSingleItem'
import SectionTitle from '@/component/Util/SectionTitle'
import SliderComponent from '@/component/Util/SliderComponent'
import React from 'react'

function BloodReqSlider() {
    return (
        <div className=''>

            <SectionTitle title={"Donate your"} focus_text={"blood"} sub_title={"Be the reason for someone's life"}></SectionTitle>
            <SliderComponent slidesToScroll={1} slidesToShow={4} dots={true} >
                <BloodRequirementSingleItem></BloodRequirementSingleItem>
                <BloodRequirementSingleItem></BloodRequirementSingleItem>
                <BloodRequirementSingleItem></BloodRequirementSingleItem>
                <BloodRequirementSingleItem></BloodRequirementSingleItem>
                <BloodRequirementSingleItem></BloodRequirementSingleItem>

            </SliderComponent>
        </div>
    )
}

export default BloodReqSlider