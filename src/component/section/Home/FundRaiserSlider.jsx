

import FundRaiserSingleItem from '@/component/FundRaiser/FundRaiserSingleItem'
import React, { useEffect, useState } from 'react'
import SliderComponent from '@/component/Util/SliderComponent';
import SectionTitle from '@/component/Util/SectionTitle';
import { getLimitedFundRaiserPost } from '@/util/data/helper/APIHelper';


function FundRaiserSlider() {

    let [fundRaiserList, setFundRaiser] = useState([]);
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    useEffect(() => {
        getLimitedFundRaiserPost(limit, page, (response) => {
            console.log(response);
            setFundRaiser(response)
        }, (err) => {
            console.log(err);
        })
    }, [])



    return (
        <section className='mt-5'>
            <div className=''>

                <SectionTitle title={"People who "} focus_text={"Suffer"} sub_title={"Donate For Poor People. Causes of Gives"}></SectionTitle>

                <SliderComponent slidesToScroll={1} slidesToShow={4} dots={true}>
                    {
                        fundRaiserList.map((each) => {
                            return <FundRaiserSingleItem fund_id={each.fund_id}></FundRaiserSingleItem>
                        })
                    }
                </SliderComponent>
            </div>

        </section>
    )
}

export default FundRaiserSlider