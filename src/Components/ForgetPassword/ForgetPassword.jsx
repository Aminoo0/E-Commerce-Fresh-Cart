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

            <div className="relative z-0 w-full mb-5 group mt-10">
                <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="emailInput" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="emailInput" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? <i className='fas fa-spin fa-spinner'></i> : 'send to email'}</button>
        </form>
    </>
    )
}
