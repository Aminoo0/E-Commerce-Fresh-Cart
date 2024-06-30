import React from 'react'
import { useState } from 'react'
import style from './Home.module.css'
import { useEffect } from 'react'
import CurentProducts from '../CurentProducts/CurentProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import HomeSlider from '../HomeSlider/HomeSlider'
import Header from '../Header/Header'


export default function Home() {



    useEffect(() => {
    }, [])


    return (<>
        <Header />
        <HomeSlider />
        <CategoriesSlider />
        <CurentProducts />

    </>
    )
}
