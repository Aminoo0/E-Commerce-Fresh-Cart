import React from 'react'
import { useState } from 'react'
import style from './ForgetPassword.module.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

export default function ForgetPassword() {

    const [loading, setLoading] = useState(false)
    const [apierror, setApiError] = useState()

    let navigate = useNavigate()

    let formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: forgetPassword
    })

    function forgetPassword(email) {
        setLoading(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
            "email": `${email.email}`
        })
            .then((response) => {
                if (response?.data?.statusMsg == 'success') {
                    setLoading(false)
                    navigate('/resetcode')
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
                setApiError(err?.response?.data?.message)
            })
    }

    return (<>
        <h1 className='text-center text-3xl font-semibold mb-20 hover:tracking-wider duration-300'>Forget Password</h1>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
            {apierror ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{apierror}!</span>
            </div> : null}

            <div className="mb-5">
                <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="emailInput" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Email" required />
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? <i className='fas fa-spin fa-spinner'></i> : 'send to email'}</button>
        </form>
    </>
    )
}
