import React from 'react'
import { useState } from 'react'
import style from './Layout.module.css'
import { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {

    const [x, setx] = useState()

    useEffect(() => {

    }, [])


    return (<>
        <Navbar />
        <div className=' mx-auto p-2 mt-20'>
            <Outlet></Outlet>
        </div>
        <Footer />
    </>
    )
}
