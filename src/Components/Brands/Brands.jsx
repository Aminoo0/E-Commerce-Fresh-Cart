import React from 'react'
import { useState } from 'react'
import style from './Brands.module.css'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'

export default function Brands() {


    function getAllBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }

    let { data, isLoading, isError, error } = useQuery({
        queryKey: ['brands'],
        queryFn: getAllBrands,
    })
    console.log(data);

    if (isLoading) {
        return <div className='flex justify-center items-center w-full h-svh'><span className="loader"></span></div>;
    }

    if (isError) {
        return <div className='flex justify-center items-center w-full h-svh'>{error}</div>;
    }


    return (<div className='overflow-hidden'>

        <div className='p-5 hover:translate-x-10 duration-500'>
            <h1 className='text-5xl text-slate-500 my-5'>Brands</h1>
        </div>
        <div className='flex flex-wrap p-5 text-center'>
            {data?.data.data.map((brand) => {
                return <motion.div whileHover={{scale:1.07}} initial={{ x: -100, y: -100, opacity: 0 }} whileInView={{ x: 0, y: 0, opacity: 1 }} transition={{duration:1}} key={brand._id} className='w-full md:w-1/3 xl:w-1/5 p-10 '>
                    <Link to={`/brandproducts/${brand._id}`}>
                        <img className='rounded-3xl h-72' src={brand.image} alt="" />
                        <h2 className='text-xl font-semibold text-slate-700 mt-5'>{brand.name}</h2>
                    </Link>
                </motion.div>
            })}
        </div>
    </div>
    )
}
