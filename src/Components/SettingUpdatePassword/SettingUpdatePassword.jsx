import React, { useContext } from 'react'
import { useState } from 'react'
import style from './SettingUpdatePassword.module.css'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { allContext } from '../../context/ContextContainer'

export default function Settings() {

    const [loading, setloading] = useState(false)
    const [apierror, setApiError] = useState();

    let navigate = useNavigate();

    let { setUserLogin } = useContext(allContext)

    let formik = useFormik({
        initialValues: {
            currentPassword: '',
            password: '',
            rePassword: '',
        },
        onSubmit: updatePassword
    })

    function updatePassword(values) {
        setloading(true)
        // console.log(values);
        axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, {
            currentPassword: values.currentPassword,
            password: values.password,
            rePassword: values.rePassword,
        }, {
            headers: { token: localStorage.getItem('userToken') }
        })
            .then((response) => {
                setloading(false)
                localStorage.removeItem('userToken');
                setUserLogin(null)
                navigate('/login')
                console.log(response);
            })
            .catch((err) => {
                setloading(false)
                console.log(err);
                setApiError(err.response.data.errors.msg)
            })
    }


    return (<>
        <h1 className='text-center my-10 text-4xl text-slate-700'>Update Your Password</h1>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">

            {apierror ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{apierror}!</span>
            </div> : null}

            <div className="mb-5">
                <input value={formik.values.currentPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="currentPassword" id="currentPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your currentPassword" required />
            </div>
            <div className="mb-5">
                <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your newPassword" required />
            </div>
            <div className="mb-5">
                <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="rePassword" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your rePassword" required />
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? <i className='fas fa-spin fa-spinner'></i> : 'update password'}</button>
        </form>
    </>
    )
}
