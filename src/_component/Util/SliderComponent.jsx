'use client'
import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import "slick-carousel/slick/slick-theme.css";

function SliderComponent({ children, slidesToShow, slidesToScroll, dots = true }) {

    let settings = {
        dots: dots,
        speed: 500,
        slidesToShow,
        slidesToScroll,
        adaptiveHeight: true, 
    };


    return (
        <> 
            <Slider {...settings}>
                {children}
            </Slider>
        </>
    )
}

export default SliderComponent