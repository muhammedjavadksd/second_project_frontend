import NewSingleItem from '@/_component/News/NewSingleItem'
import SectionTitle from '@/_component/Util/SectionTitle'
import SliderComponent from '@/_component/Util/SliderComponent'
import React from 'react'

function NewsSlider() {
    return (
        <div>
            <SectionTitle title={"Latest "} focus_text={"news"} sub_title={null}></SectionTitle>
            <SliderComponent slidesToScroll={1} slidesToShow={4} dots={true}>
                <NewSingleItem/>
                <NewSingleItem/>
                <NewSingleItem/>
                <NewSingleItem/>
                <NewSingleItem/>
            </SliderComponent>

        </div>
    )
}

export default NewsSlider