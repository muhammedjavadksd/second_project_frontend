

import FundRaiserSingleItem from '@/_component/FundRaiser/FundRaiserSingleItem'
import React from 'react'
import SliderComponent from '@/_component/Util/SliderComponent';
import SectionTitle from '@/_component/Util/SectionTitle';


function FundRaiserSlider() {

  

    return (
        <section className='mt-5'>
            <div className=''>

                <SectionTitle title={"People who "} focus_text={"Suffer"} sub_title={"Donate For Poor People. Causes of Gives"}></SectionTitle>

                <SliderComponent slidesToScroll={1} slidesToShow={4} dots={true}>
                    <FundRaiserSingleItem></FundRaiserSingleItem>
                    <FundRaiserSingleItem></FundRaiserSingleItem>
                    <FundRaiserSingleItem></FundRaiserSingleItem>
                    <FundRaiserSingleItem></FundRaiserSingleItem>
                    <FundRaiserSingleItem></FundRaiserSingleItem>
                    <FundRaiserSingleItem></FundRaiserSingleItem>
                    <FundRaiserSingleItem></FundRaiserSingleItem>
                    <FundRaiserSingleItem></FundRaiserSingleItem>
                </SliderComponent>
            </div>

        </section>
    )
}

export default FundRaiserSlider