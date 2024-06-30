import React from 'react'
import { useState } from 'react'
import style from './HomeSlider.module.css'
import { useEffect } from 'react'
import Slider from "react-slick";
import mainSlider1 from "../../assets/images/grocery-banner-2.jpeg"
import mainSlider2 from "../../assets/images/grocery-banner.png"
import mainSlider3 from "../../assets/images/slider-image-3.jpeg"
import Slide1 from "../../assets/images/slider-image-1.jpeg"
import Slide2 from "../../assets/images/slider-image-2.jpeg"

export default function HomeSlider() {

    // const [mainSliders, setMainSliders] = useState([mainSlider1, mainSlider2, mainSlider3])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows:false,
        pauseOnHover:false,
    };

    useEffect(() => {

    }, [])


    return (<>
        <div className='flex flex-wrap px-16'>

            <div className='w-full md:w-3/4'>
                <Slider {...settings}>
                    <img className='w-full h-[400px]' src={mainSlider1} alt="" />
                    <img className='w-full h-[400px]' src={mainSlider2} alt="" />
                    <img className='w-full h-[400px]' src={mainSlider3} alt="" />
                </Slider>
            </div>

            <div className='hidden md:block md:w-1/4'>
                <img className='h-[200px] w-full' src={Slide1} alt="" />
                <img className='h-[200px] w-full' src={Slide2} alt="" />
            </div>
        </div>
    </>
    )
}
