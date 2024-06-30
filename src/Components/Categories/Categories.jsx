import React from 'react'
import { useState } from 'react'
import style from './Categories.module.css'
import { useEffect } from 'react'
import axios, { all } from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'


export default function Categories() {

    // const [allcategories, setAllCategories] = useState([])

    // function getAllCategories() {
    //     axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    //         .then(({ data }) => {
    //             // console.log(data?.data);
    //             setAllCategories(data?.data)
    //         })
    // }

    // useEffect(() => {
    //     getAllCategories()
    // }, [])

    let { data, isLoading, isError, error } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories,
        staleTime: 20000,
    })

    function getAllCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }

    if (isLoading) {
        return <div className='flex justify-center items-center w-full h-svh'><span className="loader"></span></div>;
    }

    if (isError) {
        return <div className='flex justify-center items-center w-full h-svh'>{error}</div>;
    }


    return (<div className='overflow-hidden'>
        <div className='p-5 hover:translate-x-10 duration-500'>
            <h1 className='text-5xl text-slate-500 my-5'>Categories</h1>
        </div>
        <div className='flex flex-wrap p-5 mt-20'>
            {data?.data.data.map((category) => {
                return <motion.div initial={{ x: -50, y: -50, opacity: 0 }} whileInView={{ x: 0, y: 0, opacity: 1 }} transition={{duration:1}} key={category._id} className='categories w-full md:w-1/3 xl:w-1/5 p-10 overflow-hidden'>
                    <Link to={`/categoryproducts/${category._id}`}>
                        <img className='rounded-3xl h-72 duration-500' src={category.image} alt="" />
                        <h2 className='text-lg text-slate-700 mt-5'>{category.name}</h2>
                    </Link>
                </motion.div>
            })}
        </div>
    </div>
    )
}
