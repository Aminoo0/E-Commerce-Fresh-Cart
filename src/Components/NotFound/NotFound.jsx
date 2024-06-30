import React from 'react'
import { useState } from 'react'
import style from './NotFound.module.css'
import { useEffect } from 'react'
import error from '../../assets/images/error.svg'

export default function NotFound() {

    const [x, setx] = useState()

    useEffect(() => {

    }, [])


    return (<>
        <div className='flex justify-center items-center w-full h-svh p-0 m-0 bg-slate-700'>
            {/* <h1 className='text-5xl text-slate-200'>Error 404 Not Found Page</h1> */}
            <img className='w-3/4' src={error} alt="" />
        </div>
    </>
    )
}
