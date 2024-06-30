import style from './PaymentForm.module.css'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { allContext } from '../../context/ContextContainer'
import { useQuery } from '@tanstack/react-query'
import { cartContext } from '../../context/CartContext'



export default function PaymentForm() {

    const [spinnericon, setSpinnerIcon] = useState(false)
    const [apierror, setApiError] = useState()
    let { data, payment } = useContext(cartContext)
    // console.log(data);
    
    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        },
        onSubmit: () => getPayment(data?.data?.data?.data?._id, 'http://localhost:5173', formik.values)

    })

    async function getPayment(cartId, url, formValues) {
        // console.log(formValues);
        let response = await payment(cartId, url, formValues)
        console.log(response);
        if (response?.data?.status === 'success') {
            window.open(response?.data?.session?.url)
        }
    }


    return (<>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">


            <div className="relative z-0 w-full mb-5 group mt-10">
                <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="details" id="detailsInput" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="detailsInput" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your details</label>
            </div>

            <div className="relative z-0 w-full mb-5 group mt-10">
                <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phoneInput" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="phoneInput" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your phone</label>
            </div>

            <div className="relative z-0 w-full mb-5 group mt-10">
                <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="city" id="cityInput" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="cityInput" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your city</label>
            </div>

            <button type='submit' className='p-2 bg-emerald-400 rounded-lg mt-10'>check out sesson</button>
        </form>
    </>
    )
}

