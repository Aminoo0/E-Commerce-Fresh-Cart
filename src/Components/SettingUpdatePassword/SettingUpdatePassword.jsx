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
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">

            {apierror ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{apierror}!</span>
            </div> : null}

            <div className="relative z-0 w-full mb-5 group mt-10">
                <input value={formik.values.currentPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="currentPassword" id="currentPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="currentPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your currentPassword</label>
            </div>
            <div className="relative z-0 w-full mb-5 group mt-10">
                <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your newPassword</label>
            </div>
            <div className="relative z-0 w-full mb-5 group mt-10">
                <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your rePassword</label>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? <i className='fas fa-spin fa-spinner'></i> : 'update password'}</button>
        </form>
    </>
    )
}
