import React, { useContext } from 'react'
import { useState } from 'react'
import style from './BrandProducts.module.css'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useAllproducts from '../../Hooks/useAllproducts'
import useWishList from '../../Hooks/useWishList'
import { cartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'



export default function BrandProducts() {

    let x = useAllproducts()
    let { brandid } = useParams()
    const [likeproduct, setLikeProduct] = useState([])
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


    // console.log(brandid);

    let { data } = useQuery({
        queryKey: ['curentProduct'],
        select: (data) => data?.data?.data.filter((product) => product.brand._id == brandid)
    })
    // console.log(data);

    return (<>
        {data?.map((product) => {
            return <div key={product.id} className="product w-full md:w-1/2 lg:w-1/4 xl:w-1/5 p-3">
                <div className="relative min-h-screen flex flex-col items-center justify-center ">
                    <div className="container">
                        <div className="w-full bg-emerald-600 shadow-lg rounded-xl p-2">
                            <div className="flex flex-col ">
                                <div className="relative h-62 w-full mb-3 overflow-hidden">
                                    <div className="absolute flex flex-col top-0 right-0 p-3 z-10">
                                        {likeproduct.includes(product.id) ? < div className='absolute top-2 right-2 p-2 flex justify-center items-center'>
                                            <i onClick={() => deleteWishList(product.id)} className={`fa-solid fa-heart text-red-600 text-3xl cursor-pointer`}></i>
                                        </div> :
                                            <div className='absolute top-2 right-2 p-2 flex justify-center items-center'>
                                                <i onClick={() => addProductToWishList(product.id)} className={`fa-regular fa-heart text-3xl cursor-pointer`}></i>
                                            </div>}

                                    </div>
                                    <Link to={`/productdetails/${product.id}/${product.category._id}`}>
                                        <img src={product.imageCover} alt="Just a flower" className=" w-full object-fill rounded-2xl duration-500" />
                                    </Link>
                                </div>
                                <div className="flex-auto justify-evenly">
                                    <div className="flex flex-wrap ">
                                        <div className="w-full flex-none text-sm flex items-center text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-gray-400 whitespace-nowrap mr-3">{product.ratingsAverage}</span><span className="mr-2 text-gray-400">{product.category.name}</span>
                                        </div>
                                        <div className="flex items-center w-full justify-between min-w-0 ">
                                            <h2 className="text-lg mr-auto cursor-pointer text-gray-200 hover:text-purple-500 truncate ">{product.title}</h2>
                                            <div className="flex items-center bg-green-400 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                                                INSTOCK</div>
                                        </div>
                                    </div>
                                    <div className="text-xl text-white font-semibold mt-1">{product.price} EGP</div>
                                    <div className="flex space-x-2 text-sm font-medium justify-start mt-5">
                                        <button onClick={() => addProductToCart(product.id)} className="transition-all ease-in w-full duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg hover:tracking-widest text-white rounded-full hover:bg-purple-600 ">
                                            <span>Add Cart</span>
                                        </button>
                                        <Link to={`/products/specificproduct/${product.id}`}>
                                            <button className="transition ease-in duration-300 bg-gray-700 hover:bg-gray-800 border hover:border-gray-500 border-gray-700 hover:text-white  hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        })}
    </>
    )
}
