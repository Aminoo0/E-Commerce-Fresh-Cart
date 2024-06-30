import React, { useContext } from 'react'
import { useState } from 'react'
import style from './SpecificProduct.module.css'
import { useEffect } from 'react'
import useAllproducts from '../../Hooks/useAllproducts'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { cartContext } from '../../context/CartContext'
import useWishList from '../../Hooks/useWishList'
import toast from 'react-hot-toast'

export default function SpecificProduct() {

    let { id } = useParams()
    let { data } = useAllproducts()
    let { addToCart } = useContext(cartContext)
    let { addWishList, removeFromWishList } = useWishList()
    const [likeproduct, setLikeProduct] = useState([])



    // console.log(data);
    // console.log(id);

    function getProductDetails(ids) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${ids}`)
    }

    let qeury = useQuery({
        queryKey: ['curentProductDetails'],
        queryFn: () => getProductDetails(id),
        select: (qeury) => qeury?.data?.data
    })
    // console.log(qeury?.data);


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

    return (<>

        <div className="fixed  left-0 top-0 mt-10 z-10 flex justify-center items-center inset-0 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1604262725913-1c415cd27564?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2142&q=80)' }} id="modal-id">
            <div className="absolute bg-black opacity-80 inset-0 z-0" />
            <div className="relative min-h-screen flex flex-col items-center justify-center ">
                <div className="container">
                    <div className="max-w-md w-full bg-gray-900 shadow-lg rounded-xl p-6">
                        <div className="flex flex-col ">
                            <div>
                                <div className="relative h-62 w-3/4 mx-auto mb-3">
                                    {likeproduct.includes(qeury?.data?.id) ? < div className='absolute top-2 right-2 p-2 flex justify-center items-center'>
                                        <i onClick={() => deleteWishList(qeury?.data?.id)} className={`fa-solid fa-heart text-red-600 text-3xl cursor-pointer`}></i>
                                    </div> :
                                        <div className='absolute top-2 right-2 p-2 flex justify-center items-center'>
                                            <i onClick={() => addProductToWishList(qeury?.data?.id)} className={`fa-regular fa-heart text-3xl cursor-pointer`}></i>
                                        </div>}
                                    <Link to={`/productdetails/${qeury?.data?.id}/${qeury?.data?.category._id}`}>
                                        <img src={qeury?.data?.imageCover} alt="Just a flower" className=" w-full object-fill  rounded-2xl" />
                                    </Link>
                                </div>
                                <div className="flex-auto justify-evenly">
                                    <Link to={'/products'}>
                                        <div className="flex flex-wrap ">
                                            <div className="w-full flex-none text-sm flex items-center text-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-gray-400 whitespace-nowrap mr-3">{qeury?.data?.ratingsAverage}</span>
                                                <span className="mr-2 text-gray-400">{qeury?.data?.category.name}</span>
                                            </div>
                                            <div className="flex items-center w-full justify-between min-w-0 ">
                                                <h2 className="text-lg mr-auto cursor-pointer text-gray-200 hover:text-purple-500 truncate ">{qeury?.data?.title}</h2>
                                                <div className="flex items-center bg-green-400 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                                                    INSTOCK</div>
                                            </div>
                                        </div>
                                        <div className="text-xl text-white font-semibold mt-1">{qeury?.data?.price} EGP</div>
                                    </Link>
                                    <div className="flex space-x-2 text-sm font-medium justify-start mt-5">
                                        <button onClick={() => addProductToCart(qeury?.data?.id)} className="transition-all w-full ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg hover:tracking-wider text-white rounded-full hover:bg-purple-600 ">
                                            <span>Add Cart</span>
                                        </button>
                                        <Link to={'/products'}>
                                            <button className="transition ease-in duration-300 bg-gray-700 hover:bg-gray-800 border hover:border-gray-500 border-gray-700 hover:text-white hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2">
                                                <i className="fa-solid fa-left-long text-lg"></i>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
    )
}
