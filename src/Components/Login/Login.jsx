import React, { useContext } from 'react'
import { useState } from 'react'
import style from './Login.module.css'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { allContext } from '../../context/ContextContainer'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'



export default function Login() {

    const [spinnericon, setSpinnerIcon] = useState(false)
    const [apierror, setApiError] = useState()
    let navigate = useNavigate()
    let { setUserLogin } = useContext(allContext)

    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        }
        ,
        onSubmit: sendLoginForm
    })

    function sendLoginForm(formValue) {
        setSpinnerIcon(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValue)
            .then(({ data }) => {
                if (data.message == 'success') {
                    console.log(data);
                    localStorage.setItem('userToken', data.token)
                    localStorage.setItem('userName', data.user.name)
                    localStorage.setItem('userEmail', data.user.email)
                    localStorage.setItem('userRole', data.user.role)
                    setUserLogin(data.token)
                    navigate('/')
                    setSpinnerIcon(false)
                }
            })
            .catch((data) => {
                setApiError(data.response.data.message)
                setSpinnerIcon(false)
            })
    }

    useEffect(() => {

    }, [])


    return (<>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto bg-red-600">

            {apierror ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{apierror}!</span>
            </div> : null}
            <motion.div initial={{ x: -100, y: -100, opacity: 0 }} whileInView={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                <h1 className='text-center text-5xl my-10 text-slate-500 hover:tracking-wider duration-300'>Login Now</h1>
                <div className="relative z-0 w-full mb-5 group mt-10">
                    <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="emailInput" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="emailInput" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
                </div>

                {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{formik.errors.email}!</span>
                </div> : null}

                <div className="relative z-0 w-full mb-5 group mt-10">
                    <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="passwordInput" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="passwordInput" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
                </div>

                {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{formik.errors.password}!</span>
                </div> : null}
            </motion.div>
            <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{spinnericon ? <i className='fas fa-spin fa-spinner'></i> : 'Login'}</button>
                <p className='my-3'>didn't have account yet ? <span className='font-semibold text-lg'><Link to={'/register'}>Register Now</Link></span> </p>
                <span className='font-semibold text-lg'><Link to={'/forgetpassword'}>Forget Password ?</Link></span>
            </motion.div>
        </form>
    </>
    )
}