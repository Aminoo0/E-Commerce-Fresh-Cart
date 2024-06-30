import React, { useContext } from 'react'
import { useState } from 'react'
import style from './AllOrders.module.css'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { cartContext } from '../../context/CartContext'
import Slider from "react-slick";
import { Link } from 'react-router-dom'



export default function AllOrders() {
    const [first, setfirst] = useState([])
    let cartId = useContext(cartContext)
    // console.log(cartId?.data?.data?.data?.data.cartOwner);

    let { data } = useQuery({
        queryKey: ['getUserOrders'],
        queryFn: () => getUserOrder(cartId?.data?.data?.data?.data.cartOwner)
    })

    console.log(data?.data);
    function getUserOrder() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartId?.data?.data?.data?.data.cartOwner}`)
    }

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
    };



    return (<>

        {/* <div className='flex flex-wrap'>
            {data?.data?.map((product) =>
                <div key={product?.id} className="w-full flex my-5">
                    {product?.cartItems.map((img) =>
                        <div className='w-1/4'>
                            <div key={img._id} className='flex justify-between w-full'>
                                <img className='ml-5' src={img?.product?.imageCover} alt="" />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div > */}
        <div className='h-svh flex flex-col justify-center items-center'>
            <h1 className='text-emerald-500 text-5xl'>Successful purchase</h1>
            <Link className='my-5 bg-emerald-700 p-3 rounded-lg text-white' to={'/'}>Back To Home</Link>
        </div>
    </>
    )
}
