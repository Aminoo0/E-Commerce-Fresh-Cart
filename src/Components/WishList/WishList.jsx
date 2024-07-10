import React, { useContext } from 'react'
import { useState } from 'react'
import style from './WishList.module.css'
import { useEffect } from 'react'
import useWishList from '../../Hooks/useWishList'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cartContext } from '../../context/CartContext'

export default function WishList() {

    let { removeFromWishList } = useWishList()
    let { addToCart } = useContext(cartContext)

    // console.log(qeury);
    let { data, isLoading } = useQuery({
        queryKey: ['getAllWishList'],
        select: (data) => data?.data?.data
    })
    // console.log(data);

    async function addProductToCart(productId) {
        let response = await addToCart(productId)
        if (response.data.status === 'success') {
            console.log(response);
            toast.success(response?.data.message, {
                duration: 2000,
                position: 'bottom-right',
            })
        } else {
            toast.error(response?.data.message)
        }
        deleteWishList(productId)
    }

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

        <div className="flex flex-wrap items-center justify-center p-5">
            {data?.map((product) => {
                return <div key={product?.product?.id} className='p-3 w-full md:w-1/3 lg:w-1/5'>
                    <div className="bg-white shadow-md rounded-lg p-4 transform transition duration-500 ease-in-out hover:scale-105">
                        <img
                            src={product.imageCover}
                            alt="Product Image"
                            className="object-cover w-full rounded-lg overflow-hidden"
                        />
                        <h2 className="text-lg font-bold mt-2">{product?.title.split(' ').splice(0, 2).join(' ')}</h2>
                        <p className="text-gray-500">{product?.price} EGP</p>
                        <div className="flex flex-col justify-between items-center mt-4">
                            <button onClick={() => addProductToCart(product?.id)} className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700">Move to Cart</button>
                            <button onClick={() => deleteWishList(product?.id)} className="w-full text-center mt-5 bg-red-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-red-700">Remove from Cart</button>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </>
    )
}
