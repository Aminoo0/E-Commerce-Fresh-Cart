import React from 'react'
import { useState } from 'react'
import style from './WishList.module.css'
import { useEffect } from 'react'
import useWishList from '../../Hooks/useWishList'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function WishList() {

    let { removeFromWishList } = useWishList()
    // console.log(qeury);
    let { data, isLoading } = useQuery({
        queryKey: ['getAllWishList'],
        select: (data) => data?.data?.data
    })
    // console.log(data);

    async function deleteWishList(productId) {
        let response = await removeFromWishList(productId)
        if (response.data.status == 'success') {
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
        console.log(response.data.data.length);
    }

    if (isLoading) {
        return <div className='flex justify-center items-center w-full h-svh'><span className="loader"></span></div>
    }

    return (<>

        <h1 className='text-center text-5xl font-semibold text-slate-500 my-5 hover:tracking-widest duration-300'>My Wish List</h1>

        {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10">
            <table className="w-3/4 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((product) => {
                        return <tr key={product.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4">
                                <img src={product.imageCover} className='w-1/5' alt="" />
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.title}
                            </th>
                            <td className="px-6 py-4">
                                {product.category.name}
                            </td>
                            <td className="px-6 py-4">
                                {product.price} EGP
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => deleteWishList(product.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div> */}

        <div className="flex flex-col md:flex-row px-14 py-7">
            <div className='flex flex-wrap w-full'>
                {data?.map((product) => {
                    return <motion.div initial={{ x: -100, y: -50, opacity: 0 }} whileInView={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: 1 }} key={product.id} className="w-full lg:w-1/2 flex flex-col h-fit gap-4 p-2">
                        <div className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm bg-slate-100">
                            <div className="flex flex-col md:flex-row gap-3 justify-between">
                                <div className="flex flex-row gap-6 items-center">
                                    <div className="w-28 h-28">
                                        <img className="w-full h-full" src={product?.imageCover} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg text-gray-800 font-semibold">{product?.title}</p>
                                        <p className="text-xs text-gray-600 font-semibold"><span className="font-normal">{product?.category.name}</span></p>
                                        <p className="text-xs text-gray-600 font-semibold">Size: <span className="font-normal">42</span></p>
                                    </div>
                                </div>
                                <div className="self-center text-center">
                                    <p className="text-gray-600 font-normal text-sm line-through">
                                        <span className="text-emerald-500 ml-2">(-50% OFF)</span>
                                    </p>
                                    <p className="text-gray-800 font-normal text-xl">{product?.price} EGP</p>
                                </div>
                                <div className="self-center">
                                    <button onClick={() => deleteWishList(product.id)}>
                                        <svg height="24px" width="24px" id="Layer_1" style={{ enableBackground: 'new 0 0 512 512' }} version="1.1" viewBox="0 0 512 512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                            <g>
                                                <path d="M400,113.3h-80v-20c0-16.2-13.1-29.3-29.3-29.3h-69.5C205.1,64,192,77.1,192,93.3v20h-80V128h21.1l23.6,290.7   c0,16.2,13.1,29.3,29.3,29.3h141c16.2,0,29.3-13.1,29.3-29.3L379.6,128H400V113.3z M206.6,93.3c0-8.1,6.6-14.7,14.6-14.7h69.5   c8.1,0,14.6,6.6,14.6,14.7v20h-98.7V93.3z M341.6,417.9l0,0.4v0.4c0,8.1-6.6,14.7-14.6,14.7H186c-8.1,0-14.6-6.6-14.6-14.7v-0.4   l0-0.4L147.7,128h217.2L341.6,417.9z" />
                                                <g>
                                                    <rect height={241} width={14} x={249} y={160} />
                                                    <polygon points="320,160 305.4,160 294.7,401 309.3,401" />
                                                    <polygon points="206.5,160 192,160 202.7,401 217.3,401" />
                                                </g>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                })}
            </div>
        </div>


    </>
    )
}
