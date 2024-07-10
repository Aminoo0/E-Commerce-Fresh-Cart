import React from 'react'
import { useState } from 'react'
import style from './Register.module.css'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'


export default function Register() {

    const [spinnericon, setSpinnerIcon] = useState(false)
    const [apierror, setApiError] = useState()
    let navigate = useNavigate()

    let validationForm = Yup.object().shape({
        name: Yup.string().min(3, 'name minlanght is 3').max(10, 'name maxlenght is 10').required('name must be required'),
        email: Yup.string().email('email is not validation').required('email must be required'),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'phone must be egyption number').required('phone must be required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{6,15}$/, 'password must start with uppercase').required('password must be required'),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'password and repassword must be same').required('repassword must be required'),
    })

    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        }, validationSchema: validationForm
        ,
        onSubmit: sendRegisterForm
    })

    function sendRegisterForm(formValue) {
        setSpinnerIcon(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValue)
            .then(({ data }) => {
                if (data.message == 'success') {
                    console.log(data)
                    // localStorage.setItem('userToken', data.token)
                    navigate('/login')
                    setSpinnerIcon(false)
                }
            })
            .catch((data) => {
                console.log(data);
                setApiError(data.response.data.message)
                setSpinnerIcon(false)
            })
    }



    useEffect(() => {

    }, [])


    return (<>

        <motion.form initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} onSubmit={formik.handleSubmit} className="py-6">

            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80")' }} />
                <div className="w-full p-8 lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">Register Now</h2>
                    <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                    {apierror ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{apierror}!</span>
                    </div> : null}
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Enter Your Name</label>
                        <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="name" id="nameInput" className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" />
                    </div>

                    {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{formik.errors.name}!</span>
                    </div> : null}

                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Enter Your Password</label>
                        <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="emailInput" className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" />
                    </div>

                    {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{formik.errors.email}!</span>
                    </div> : null}

                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Enter Your Phone</label>
                        <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phoneInput" className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" />
                    </div>

                    {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{formik.errors.phone}!</span>
                    </div> : null}

                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Enter Your Paswword</label>
                        <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="passwordInput" className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" />
                    </div>

                    {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{formik.errors.password}!</span>
                    </div> : null}

                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Enter Your rePaswword</label>
                        <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="rePassword" id="repasswordInput" className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" />
                    </div>

                    {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{formik.errors.rePassword}!</span>
                    </div> : null}

                    <div className="mt-8">
                        <button type='submit' className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">{spinnericon ? <i className='fas fa-spin fa-spinner'></i> : 'Register'}</button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4" />
                        <Link to={'/login'} className="text-xs text-gray-500 uppercase">or login in</Link>
                        <span className="border-b w-1/5 md:w-1/4" />
                    </div>
                </div>
            </div>
        </motion.form>
    </>
    )
}
