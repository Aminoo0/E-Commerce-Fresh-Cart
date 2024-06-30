import React from 'react'
import { useState } from 'react'
import style from './CategoriesSlider.module.css'
import { useEffect } from 'react'
import Slider from "react-slick";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function CategoriesSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
    };

    function getAllCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }

    let { data, isLoading, isError, error, isFetching } = useQuery(
        {
            queryKey: ['categoriesSlider'],
            queryFn: getAllCategories,
            select: (data) => data?.data.data,
            refetchInterval: 1,
        }
    )
    useEffect(() => {
    }, [])


    return (<>
        <div className='w-full md:w-11/12 mx-auto mt-10 overflow-hidden'>
            <h2 className='text-2xl mb-2 text-emerald-800 font-semibold'>Shop Popular Categories</h2>
            <Slider {...settings}>
                {data?.map((category) => {
                    return <div key={category._id} className='categories p-1 overflow-hidden'>
                        <Link to={`categoryproducts/${category._id}`}>
                            <img className='h-72 w-full duration-500' src={category.image} alt="" />
                            <h2 className='text-center text-xl text-emerald-500'>{category.name}</h2>
                        </Link>
                    </div>
                })}
            </Slider>
        </div>
    </>
    )
}
