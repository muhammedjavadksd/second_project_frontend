'use client'
import React, { useRef } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import "slick-carousel/slick/slick-theme.css";
import { ISliderComponent } from '@/util/types/InterFace/PropInterFace';

function SliderComponent({ children, slidesToShow, slidesToScroll, dots = true, isGap = false, arrow = false }: ISliderComponent) {

    let sliderRef = useRef(null);

    let settings = {
        initialSlide: 0,
        dots: true,
        infinite: true,
        speed: 500,
        centerPadding: '1%',
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        autoplay: true,
        vertical: false,
        verticalSwiping: false,
        adaptiveHeight: true,
        variableHeight: false,
        responsive: [
            {
                breakpoint: 768, // Tablet
                settings: {
                    slidesToShow: 2, // Show 2 slides on tablet
                    slidesToScroll: 1,
                    centerPadding: '0%',
                }
            },
            {
                breakpoint: 1024, // Laptop
                settings: {
                    slidesToShow: 1, // Show 1 slide on laptops
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <div className={`${isGap ? 'sliderCap' : ''}`}>
            <Slider ref={sliderRef} {...settings}>
                {children}
            </Slider>
            {
                arrow && (
                    <>
                        <button onClick={() => sliderRef?.current?.slickPrev()} type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                                </svg>
                                <span className="sr-only">Previous</span>
                            </span>
                        </button>
                        <button onClick={() => sliderRef?.current?.slickNext()} type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span className="sr-only">Next</span>
                            </span>
                        </button>
                    </>
                )
            }
        </div>
    )
}

export default SliderComponent