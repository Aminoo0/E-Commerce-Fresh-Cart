import React from 'react'
import { useState } from 'react'
import style from './Header.module.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import header from './../../assets/images/header.jpeg'
import { motion } from 'framer-motion'

export default function Header() {

    const [x, setx] = useState()
    const text = 'Safe and fast purchase with immediate shipping!'
    const hText = 'All products you want'

    let pVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: .05,
            }
        }
    }
    let spanVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1
        }
    }

    let hVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: .05,
            }
        }
    }

    let spanhVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1
        }
    }


    useEffect(() => {

    }, [])


    return (<>
        <div className='p-0 m-0 mb-10'>
            <div className="w-full m-0 p-0">
                <div className="flex bg-white" style={{ height: 600 }}>
                    <div className="flex items-center text-center mx-auto lg:text-left px-8 md:px-12 lg:w-1/2">
                        <div>
                            <motion.h2 variants={hVariants} initial='hidden' whileInView='visible' className="text-3xl font-semibold text-gray-800 md:text-4xl">{hText.split('').map((char, index) => <motion.span variants={spanhVariants} key={index}>{char}</motion.span>)}</motion.h2>
                            <motion.p variants={pVariants} initial='hidden' whileInView='visible' className="mt-2 text-lg text-gray-500 md:text-base">{text.split('').map((char, index) => <motion.span variants={spanVariants} key={index}>{char}</motion.span>)}</motion.p>
                            <div className="flex justify-center items-center lg:justify-start mt-6">
                                <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}><Link to={'/products'} className="px-4 py-3 bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800" href="#">purchase now</Link></motion.div>
                                <motion.a initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400" href="#">Learn More</motion.a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block lg:w-1/2" style={{ clipPath: 'polygon(10% 0, 100% 0%, 100% 100%, 0 100%)' }}>
                        <div className="h-full object-cover" style={{ backgroundImage: `url(${header})` }}>
                            <div className="h-full bg-black opacity-25" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
