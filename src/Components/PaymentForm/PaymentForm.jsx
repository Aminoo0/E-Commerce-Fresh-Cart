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
        <h1 className='text-4xl font-semibold text-center my-10 hover:tracking-wider duration-300'>Contact Details</h1>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">

            <div className="mb-5">
                <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="details" id="detailsInput" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your name" required />
            </div>

            <div className="mb-5">
                <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phoneInput" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your phone" required />
            </div>

            <div className="mb-5">
                <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="city" id="cityInput" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your city" required />
            </div>

            <button type='submit' className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700">Checkout</button>
        </form>
    </>
    )
}

