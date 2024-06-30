import React from 'react'
import { useState } from 'react'
import style from './Profile.module.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Profile() {

    return (<>

        <div className=''>
            <div className="flex flex-col justify-center items-center h-[90vh]">
                <motion.div initial={{ x: -100, y: -100, opacity: 0 }} whileInView={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: 1 }} className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                        <img src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png" className="absolute flex h-32 w-full justify-center rounded-xl bg-cover" />
                        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                            <img className="h-full w-full rounded-full" src={''} />
                        </div>
                    </div>
                    <div className="mt-16 flex flex-col items-center">
                        <h4 className="text-3xl font-bold text-navy-700 dark:text-white">
                            {localStorage.getItem('userName')}
                        </h4>
                        <p className="text-base font-normal text-gray-600">{localStorage.getItem('userRole')}</p>
                    </div>
                    <h3 className='text-3xl mt-5 my-5 text-emerald-700'>{localStorage.getItem('userEmail')}</h3>
                </motion.div>
                <motion.p initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="font-bold text-xl mt-5 mx-auto w-max hover:tracking-wider duration-300"><Link to={'/profile/settingupdateuserdata'} target="_blank" className="text-brand-500 font-bold"> <i className="fa-regular fa-pen-to-square"></i> Update Your Data</Link></motion.p>
                <motion.p initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="font-bold text-xl mt-5 mx-auto w-max hover:tracking-wider duration-300"><Link to={'/profile/settingupdatepassword'} target="_blank" className="text-brand-500 font-bold"> <i className="fa-solid fa-unlock-keyhole"></i> Update Your Password</Link></motion.p>
            </div>
        </div>
    </>
    )
}
