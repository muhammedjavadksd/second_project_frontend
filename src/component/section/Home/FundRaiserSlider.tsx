

import FundRaiserSingleItem from '@/component/FundRaiser/FundRaiserSingleItem'
import React, { useEffect, useState } from 'react'
import SliderComponent from '@/component/Util/SliderComponent';
import SectionTitle from '@/component/Util/SectionTitle';
import { getLimitedFundRaiserPost } from '@/util/data/helper/APIHelper';
import const_data from '@/util/data/const';
import { FundRaiserResponse } from '@/util/types/API Response/FundRaiser';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the styles for the skeleton
import Skeleton from 'react-loading-skeleton';


function FundRaiserSlider({ profiles, exclude }: { profiles: FundRaiserResponse[], exclude: string }) {

    // let [fundRaiserList, setFundRaiser] = useState([]);

    // useEffect(() => {
    //     getLimitedFundRaiserPost(10, 1, (response) => {
    //         console.log(response);
    //         setFundRaiser(response)
    //     }, (err) => {
    //         console.log(err);
    //     })
    // }, [])



    return (
        <section className='mt-5'>
            <div className=''>

                {
                    profiles.length ? <SliderComponent arrow={true} isGap={true} slidesToScroll={1} slidesToShow={4} dots={false}>
                        {
                            profiles.map((each, index) => {
                                if (each.fund_id != exclude) {
                                    return (
                                        <>
                                            <FundRaiserSingleItem key={index} profile={each}></FundRaiserSingleItem>
                                        </>
                                    )
                                }
                            })
                        }
                    </SliderComponent> : <div className='container mx-auto'>
                        <Skeleton height={200} />
                    </div>}
            </div>

        </section>
    )
}

export default FundRaiserSlider