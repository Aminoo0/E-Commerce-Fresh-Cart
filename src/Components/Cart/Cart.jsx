import React, { useContext } from 'react'
import { useState } from 'react'
import style from './Cart.module.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { cartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'



export default function Cart() {

    let { deleteFromCart, updateCart } = useContext(cartContext)

    let { data, isLoading, isError, error } = useQuery({
        queryKey: ['getAllUserCart'],
        select: (data) => data?.data,
    })

    // console.log(data);
    async function deleteCart(productId) {
        let response = await deleteFromCart(productId)
        // console.log(response);
    }

    let updatefromCart = async (productId, count) => {
        if (count < 1)
            return;

        let response = await updateCart(productId, count)
        // console.log(response);
    }

    if (isLoading) {
        return <div className='flex justify-center items-center w-full h-svh'><span className="loader"></span></div>
    }

    return (<>

        <h1 className='text-center text-5xl font-semibold text-slate-500 my-5 hover:tracking-widest duration-300'>My Cart</h1>

        <div className="flex flex-col md:flex-row px-14 py-7">
            <div className='flex flex-wrap w-full'>
                <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{duration:2}} className="flex flex-col w-full md:w-2/3 mx-auto h-fit gap-4 p-4">
                    <p className="text-blue-900 text-xl font-extrabold">Total Price</p>
                    <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
                        <div className="flex flex-row justify-between">
                            <p className="text-gray-600">Total Price ({data?.numOfCartItems} Items)</p>
                            <div>
                                <p className="text-end font-bold">{data?.data?.totalCartPrice} EGP</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="transition-colors text-sm bg-blue-600 hover:bg-blue-700 p-2 rounded-sm w-full text-white text-hover shadow-md">
                                <Link to={'/'}>HOME</Link>
                            </button>
                            <button className="transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md">
                                <Link to={'/products'}> ADD MORE PRODUCTS</Link>
                            </button>
                        </div>
                    </div>
                </motion.div>
                {data?.data.products.map((product) => {
                    return <motion.div initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} key={product.product.id} className="w-full lg:w-1/2 flex flex-col h-fit gap-4 p-2">
                        <div className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm bg-slate-100">
                            <div className="flex flex-col md:flex-row gap-3 justify-between">
                                <div className="flex flex-row gap-6 items-center">
                                    <div className="w-28 h-28">
                                        <img className="w-full h-full" src={product?.product?.imageCover} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg text-gray-800 font-semibold">{product?.product?.title}</p>
                                        <p className="text-xs text-gray-600 font-semibold"><span className="font-normal">{product?.product?.category?.name}</span></p>
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
                                    <button onClick={() => deleteCart(product.product.id)}>
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
                            <div className="flex flex-row self-center gap-1">
                                <button onClick={() => updatefromCart(product.product.id, product.count - 1)} className="w-5 h-5 self-center rounded-full border border-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14" />
                                    </svg>
                                </button>
                                <span className='p-2'>{product?.count}</span>
                                <button onClick={() => updatefromCart(product.product.id, product.count + 1)} className="w-5 h-5 self-center rounded-full border border-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                })}
            </div>
        </div>
        <div className='text-center'>
            <Link className='mx-auto' to={'/paymentform'}>
                <button className='p-2 bg-emerald-400 rounded-lg mt-10'>check out sesson</button>
            </Link>
        </div>
    </>)
}
