import BloodRequirementSingleItem from '@/_component/Blood/BloodRequirementSingleItem'
import SectionTitle from '@/_component/Util/SectionTitle'
import SliderComponent from '@/_component/Util/SliderComponent'
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