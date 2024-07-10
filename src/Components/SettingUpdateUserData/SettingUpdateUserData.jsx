import React, { useContext } from 'react'
import { useState } from 'react'
import style from './SettingUpdateUserData.module.css'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { allContext } from '../../context/ContextContainer'

export default function SettingUpdateUserData() {

    const [loading, setLoading] = useState(false)
    const [apierror, setApiError] = useState()
    let { setUserLogin } = useContext(allContext)

    let navigate = useNavigate()

    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
        },
        onSubmit: updateUserInfo
    });

    function updateUserInfo(values) {
        setLoading(true)
        axios.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, {
            name: values.name,
            email: values.email,
            phone: values.phone,
        }, {
            headers: { token: localStorage.getItem('userToken') }
        })
            .then((response) => {
                console.log(response);
                setLoading(false)
                localStorage.removeItem('userToken')
                setUserLogin(null)
                navigate('/login')
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
                setApiError(err.response.data.errors.msg)
            })
    }


    return (<>
        <h1 className='text-center my-10 text-4xl text-slate-700'>Update Your Informatin</h1>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
            {apierror ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{apierror}!</span>
            </div> : null}

            <div className="mb-5">
                <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="name" id="nameInput" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your name" required />
            </div>
            <div className="mb-5">
                <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="emailInput" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Email" required />
            </div>
            <div className="mb-5">
                <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phoneInput" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your phone" required />
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? <i className='fas fa-spin fa-spinner'></i> : 'Update'}</button>
        </form>
    </>
    )
}
