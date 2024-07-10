import React, { useContext, useRef } from 'react'
import { useState } from 'react'
import style from './CurentProducts.module.css'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useAllproducts from '../../Hooks/useAllproducts'
import { cartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'
import useWishList from '../../Hooks/useWishList'
import { tuple } from 'yup'
import { motion } from 'framer-motion'
// https://ecommerce.routemisr.com


export default function CurentProducts() {

    const [likeproduct, setLikeProduct] = useState([])
    let divVariants = {
        hidden: {
            x: -100,
            opacity: 0,
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: .5,
            }
        }
    }

    let { addWishList, removeFromWishList } = useWishList()
    let { addToCart } = useContext(cartContext)

    async function addProductToWishList(productId) {

        let response = await addWishList(productId)
        if (response.data.status == 'success') {
            toast.success(response.data.message, {
                position: 'bottom-right',
            })

            setLikeProduct([...response.data.data])
            // console.log(likeproduct)
            console.log(response.data.data);
        } else {
            toast.error(response.data.message)
        }
        // console.log(response);
    }

    async function deleteWishList(productId) {
        let response = await removeFromWishList(productId)
        if (response.data.status == 'success') {
            toast.success(response.data.message)
            setLikeProduct(response.data.data)
            // console.log(likeproduct);
            console.log(response.data.data);
        } else {
            toast.error(response.data.message)
        }
        // console.log(response.data.data.length);
    }


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
    }

    let { data, isLoading, isError, error, isFetching } = useAllproducts()

    // console.log(data);

    if (isLoading) {
        return <div className='flex justify-center items-center w-full h-svh'><span className="loader"></span></div>
    }

    return (<>
        <div className='flex flex-wrap xl:p-10 mt-5 gap-y-10'>

            {data?.map((product) => {
                return <div key={product.id} className="product w-4/5 md:w-1/2 lg:w-1/4 xl:w-1/5 p-4 mx-auto">
                    <motion.div variants={divVariants} initial='hidden' whileInView='visible' whileHover={{ scale: 1.03 }} className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-2xl duration-500">
                        <div className="absolute flex flex-col top-0 right-0 p-3 z-10">
                            {likeproduct.includes(product.id) ? < div className='absolute top-2 right-2 p-2 flex justify-center items-center'>
                                <i onClick={() => deleteWishList(product.id)} className={`fa-solid fa-heart text-red-600 text-xl cursor-pointer hover:scale-105 duration-300`}></i>
                            </div> :
                                <div className='absolute top-2 right-2 p-2 flex justify-center items-center'>
                                    <i onClick={() => addProductToWishList(product.id)} className={`fa-regular fa-heart text-xl cursor-pointer hover:scale-105 duration-300`}></i>
                                </div>}
                        </div>
                        <Link to={`/productdetails/${product.id}/${product.category._id}`}>
                            <img className="w-full rounded-t-lg object-cover duration-300" src={product.imageCover} alt="product image" />
                        </Link>
                        <div className="mt-4 px-4 pb-5">
                            <Link to={`/productdetails/${product.id}/${product.category._id}`}>
                                <h5 className="text-xl font-semibold tracking-tight text-slate-900">{product.title.split(' ').splice(0, 2).join(' ')}</h5>
                            </Link>
                            <div className="mt-2.5 mb-5 flex items-center">
                                <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{product.ratingsAverage}</span>
                                <i className="fa-regular fa-star text-yellow-400"></i>
                                <i className="fa-regular fa-star text-yellow-400"></i>
                                <i className="fa-regular fa-star text-yellow-400"></i>
                                <i className="fa-regular fa-star text-yellow-400"></i>
                                <i className="fa-regular fa-star text-yellow-400"></i>
                            </div>
                            <div className="flex items-center justify-between">
                                <p>
                                    <span className="font-semibold text-slate-900">{product.price} EGP</span>
                                    {/* <span className="text-sm text-slate-900 line-through">$299</span> */}
                                </p>
                                <Link onClick={() => addProductToCart(product.id)} className="flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Add to cart</Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            })}
        </div >
    </>
    )
}

