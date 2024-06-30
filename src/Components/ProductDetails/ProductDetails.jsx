import React, { useContext } from 'react'
import { useState } from 'react'
import style from './ProductDetails.module.css'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import { useQuery } from '@tanstack/react-query'
import { cartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'
import useWishList from '../../Hooks/useWishList'
import useAllproducts from '../../Hooks/useAllproducts'

export default function ProductDetails() {

    let { id, category } = useParams();
    let { addToCart } = useContext(cartContext)
    const [likeproduct, setLikeProduct] = useState([])

    let { addWishList, removeFromWishList } = useWishList()
    let response = useAllproducts()


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

    function getProductDetails(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    let { data } = useQuery(
        {
            queryKey: ['curentProductDetails'],
            queryFn: () => getProductDetails(id),
            select: (data) => data?.data.data,
            refetchInterval: 10,
        }
    )
    // console.log(data);

    let categoryDetails = useQuery(
        {
            queryKey: ['curentProduct'],
            // queryFn: getCurentCategory,
            select: (categoryDetails) => categoryDetails?.data.data.filter((product) => product.category._id == category),
            // refetchInterval: 1,
        }
    )
    // console.log(categoryDetails?.data);

    async function addProductToWishList(productId) {

        let response = await addWishList(productId)
        if (response.data.status == 'success') {
            toast.success(response.data.message, {
                position: 'bottom-right',
            })
            setLikeProduct([...response.data.data])
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


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };

    var settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
    };

    return (<>

        {data ? <> <section className="text-gray-700 body-font overflow-hidden bg-white">
            <div className="container px-5 py-16 mx-auto">
                <div className="lg:w-5/5 mx-auto flex flex-wrap justify-center">
                    <div className='product w-full md:w-1/4 overflow-hidden'>
                        <Slider {...settings}>
                            {data?.images.map((img, index) => <img key={index} alt="ecommerce" className="w-full duration-500 object-cover object-center rounded border border-gray-200" src={img} />)}
                        </Slider>
                    </div>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{data?.brand.name}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data?.title}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <span className="text-gray-600 ml-3">{data?.reviews.length} Reviews</span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                    </svg>
                                </a>
                                <a className="ml-2 text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                    </svg>
                                </a>
                                <a className="ml-2 text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                    </svg>
                                </a>
                            </span>
                        </div>
                        <p className="leading-relaxed">{data?.description}.</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                            <div className="flex">
                                <span className="mr-3">Color</span>
                                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" />
                                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none" />
                                <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none" />
                            </div>
                            {/* <div className="flex ml-6 items-center">
                                <span className="mr-3">Size</span>
                                <div className="relative">
                                    <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                        <option>SM</option>
                                        <option>M</option>
                                        <option>L</option>
                                        <option>XL</option>
                                    </select>
                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4" viewBox="0 0 24 24">
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </span>
                                </div>
                            </div> */}
                        </div>
                        <div className="flex">
                            <span className="title-font font-medium text-2xl text-gray-900">{data?.price} EGP</span>
                            <button onClick={() => addProductToCart(data?.id)} className="flex ml-auto text-white bg-red-500 border-0 py-2 px-16 focus:outline-none hover:bg-red-600 rounded">Add To Cart</button>
                            <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                {likeproduct.includes(data?.id) ?
                                    <i onClick={() => deleteWishList(data?.id)} className={`fa-solid fa-heart text-red-600 text-2xl cursor-pointer`}></i>
                                    : <i onClick={() => addProductToWishList(data?.id)} className={`fa-regular fa-heart text-red-600 text-2xl cursor-pointer`}></i>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

            <div className='p-10'>
                <Slider {...settings2}>
                    {categoryDetails?.data?.map((product) => {
                        return <div key={product.id} className='product w-full md:w-1/3 xl:w-1/5 p-10'>
                            <Link to={`/productdetails/${product.id}/${product.category._id}`}>
                                <img alt="ecommerce" className="w-full duration-500 object-cover object-center rounded border border-gray-200" src={product.imageCover} />
                                <h2 className='text-lg text-slate-700 mt-5 text-center'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                            </Link>
                        </div>
                    })}
                </Slider>
            </div></> : <div className='flex justify-center items-center w-full h-svh'><span className="loader"></span></div>}

    </>
    )
}
