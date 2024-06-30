import React, { useContext } from 'react'
import { useState } from 'react'
import style from './Navbar.module.css'
import { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from './../../assets/images/logo.svg'
import { allContext } from '../../context/ContextContainer'
import { useQuery } from '@tanstack/react-query'
import useWishList from '../../Hooks/useWishList'
import { motion } from 'framer-motion'

export default function Navbar() {

    const [showicon, setShowIcon] = useState(true)
    const [showsidenav, setShowSideNav] = useState(false)
    let navigate = useNavigate()
    let { userlogin, setUserLogin } = useContext(allContext)

    let { qeury } = useWishList()
    // console.log(qeury?.data?.data.data.length);

    let { data } = useQuery({
        queryKey: ['getAllUserCart']
    })
    // console.log(data);

    let userLogOut = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        setUserLogin(null)
        navigate('/header')
        setShowSideNav(false)
    }


    window.addEventListener('scroll', () => {
        // console.log(window.scrollY);
        let navheight = document.querySelector('nav');
        // navheight.classList.toggle('bg-slate-400', window.scrollY > navheight.offsetHeight)
        if (window.scrollY > navheight.offsetHeight) {
            navheight.classList.add('py-1', 'bg-slate-600')
        } else {
            navheight.classList.remove('py-1', 'bg-slate-600')
        }
    })

    useEffect(() => {

    }, [])


    return (<>

        {/* <nav className="bg-slate-500 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 duration-500">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} alt="" />
                </Link>
                <div onClick={() => setShowIcon(!showicon)} className='lg:hidden'>
                    {showicon ? <i className='fas fa-bars text-2xl'></i>
                        : <i className='fas fa-close text-2xl'></i>}
                </div>
                {userlogin !== null ? <div className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${!showicon ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">

                        <li onClick={() => setShowSideNav(false)}>
                            <NavLink onClick={() => setShowIcon(!showicon)} to={'/'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-300 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Home</NavLink>
                        </li>
                        <li onClick={() => setShowSideNav(false)}>
                            <NavLink onClick={() => setShowIcon(!showicon)} to={'/categories'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-300 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Categories</NavLink>
                        </li>
                        <li onClick={() => setShowSideNav(false)}>
                            <NavLink onClick={() => setShowIcon(!showicon)} to={'/brands'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-300 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Brands</NavLink>
                        </li>
                        <li onClick={() => setShowSideNav(false)}>
                            <NavLink onClick={() => setShowIcon(!showicon)} to={'/products'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-300 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Products</NavLink>
                        </li>
                        <li onClick={() => setShowSideNav(false)}>
                            <NavLink onClick={() => setShowIcon(!showicon)} to={'/cart'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-300 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Cart</NavLink>
                        </li>
                        <li onClick={() => setShowSideNav(false)}>
                            <NavLink onClick={() => setShowIcon(!showicon)} to={'/wishlist'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-300 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Wish List</NavLink>
                        </li>
                    </ul>
                </div> : null}
                <div className={`lg:block absolute top-full left-0 right-0 p-3 lg:p-0 bg-slate-400 lg:bg-transparent lg:relative  lg:order-2 space-x-3 lg:space-x-0 ${!showicon ? 'block' : 'hidden'}`}>
                    <ul className='flex flex-col pl-7 lg:flex-row lg:p-0 gap-5 font-semibold'>
                        {userlogin == null ? <div className='flex flex-col lg:flex-row gap-3'> <li onClick={() => setShowSideNav(false)}><NavLink onClick={() => setShowIcon(!showicon)} to={'/login'}>Login</NavLink></li>
                            <li onClick={() => setShowSideNav(false)}><NavLink onClick={() => setShowIcon(!showicon)} to={'/register'}>Register</NavLink></li></div>
                            : <div className='flex flex-col lg:flex-row items-center gap-5'>
                                <li onClick={() => setShowSideNav(false)}><Link className='relative' to={'/wishlist'} onClick={() => setShowIcon(!showicon)}><i className="fa-solid fa-heart text-yellow-500 mr-2 text-2xl"></i><h5 className='absolute -top-3 right-0 bg-blue-400 p-1 rounded-full bg-opacity-50'>{qeury?.data?.data.data.length}</h5></Link></li>
                                <li onClick={() => setShowSideNav(false)}><Link className='relative' to={'/cart'} onClick={() => setShowIcon(!showicon)}><i className="fa-solid fa-cart-shopping text-yellow-500 mr-2 text-2xl"></i> <h5 className='absolute -top-3 right-0 bg-blue-400 p-1 rounded-full bg-opacity-50'>{data?.data?.numOfCartItems}</h5></Link></li>
                                <li onClick={() => setShowSideNav(!showsidenav)} className='cursor-pointer'> <i onClick={() => setShowIcon(!showicon)} className="fa-solid fa-gear fa-spin mr-2"></i></li>
                                <li onClick={() => userLogOut()}><Link onClick={() => setShowIcon(!showicon)}>Log Out</Link></li>
                            </div>}
                    </ul>
                </div>
            </div >
        </nav > */}




        <nav className="fixed top-0 left-0 right-0 flex justify-between bg-gray-500 text-white w-screen z-50 duration-500">
            <div className="px-5 xl:px-12 py-4 flex w-full items-center justify-between">
                <Link to={'/header'} className="text-3xl font-bold font-heading">
                    <img className="h-9" src={logo} alt="logo" />
                </Link>
                {userlogin !== null ? <ul className={`${showicon ? 'hidden' : 'block'} absolute top-full left-0 w-full xl:w-auto bg-emerald-300 xl:bg-transparent gap-10 xl:static xl:flex p-4 xl:p-0 px-10 mx-auto text-xl`}>
                    <li className='hover:pl-2 xl:hover:pl-0 duration-500 py-2'><NavLink className="hover:text-gray-200" to={'/'}>Home</NavLink></li>
                    <li className='hover:pl-2 xl:hover:pl-0 duration-500 py-2'><NavLink className="hover:text-gray-200" to={'/categories'}>Catagories</NavLink></li>
                    <li className='hover:pl-2 xl:hover:pl-0 duration-500 py-2'><NavLink className="hover:text-gray-200" to={'/brands'}>Brands</NavLink></li>
                    <li className='hover:pl-2 xl:hover:pl-0 duration-500 py-2'><NavLink className="hover:text-gray-200" to={'/products'}>Products</NavLink></li>
                    <li className='hover:pl-2 xl:hover:pl-0 duration-500 py-2'><NavLink className="hover:text-gray-200" to={'/cart'}>Cart</NavLink></li>
                    <li className='hover:pl-2 xl:hover:pl-0 duration-500 py-2'><NavLink className="hover:text-gray-200" to={'/wishlist'}>Wish List</NavLink></li>
                </ul> : <ul className='flex gap-5 text-xl mr-10'>
                    <li><NavLink className="hover:text-gray-200" to={'/login'}>Login</NavLink></li>
                    <li><NavLink className="hover:text-gray-200" to={'/register'}>Register</NavLink></li>
                </ul>
                }
                {userlogin !== null ? <div className={`${showicon ? 'hidden' : 'block'} absolute bg-emerald-300 xl:bg-transparent top-[360px] w-full xl:w-auto left-0 xl:static xl:flex xl:gap-5 p-10 xl:p-0 flex justify-between items-center`}>
                    <Link to={'/wishlist'} className="hover:text-gray-200 relative">
                        <i className="fa-regular fa-heart text-2xl"></i>
                        <span className='absolute -top-3 flex justify-center items-center -right-2 text-xl p-3 bg-pink-500 w-5 h-5 rounded-full'>{qeury?.data?.data.data.length}</span>
                    </Link>
                    <Link to={'/cart'} className="flex items-center relative hover:text-gray-200">
                        <i className="fa-brands fa-opencart text-2xl"></i>
                        <span className='absolute -top-3 flex justify-center items-center -right-2 text-xl p-3 bg-pink-500 w-5 h-5 rounded-full'>{data?.data?.numOfCartItems}</span>
                    </Link>
                    <Link to={'/profile'} className="flex items-center hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </Link>
                    <ul>
                        <li onClick={() => userLogOut()}><NavLink className="hover:text-gray-200 text-lg">Log Out</NavLink></li>
                    </ul>
                </div> : null}
            </div>
            {userlogin !== null ? <Link to={'/cart'} className="xl:hidden flex mr-6 items-center" href="#">
                <i className="fa-brands fa-opencart text-2xl"></i>
                <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-100 text-yellow-400">{data?.data?.numOfCartItems}</span>
                    <span className="relative inline-flex rounded-full h-3 w-3">
                    </span>
                </span>
            </Link> : null}
            {userlogin !== null ? <span onClick={() => setShowIcon(!showicon)} className="navbar-burger cursor-pointer self-center mr-12 xl:hidden" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </span> : null}
        </nav >

        <div className="fixed bottom-0 right-0 mb-4 mr-4 z-10">
            <div>
                <a href="#" className="bg-emerald-200 w-14 h-14 rounded-full transition-all shadow hover:shadow-lg items-center justify-center flex">
                    <i className="fa-solid fa-arrow-up"></i>
                </a>
            </div>
        </div>

        {userlogin !== null ? <nav>
            <div className="relative bg-gray-50 dark:bg-slate-900">
                <nav className="z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5  shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed top-2/4 -translate-y-2/4 left-6 min-h-[auto] min-w-[64px] flex-col rounded-lg border">
                    <NavLink to={'/'} className="flex h-16 w-16 flex-col items-center justify-center gap-1 text-fuchsia-900 dark:text-gray-400 hover:bg-gray-100 rounded-md hover:scale-125 duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                        </svg>
                        <small className="text-xs font-medium">Home</small>
                    </NavLink>
                    <NavLink to={'/profile'} className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-indigo-600 dark:bg-sky-900 dark:text-sky-50 hover:bg-gray-100 hover:scale-125 duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <small className="text-center text-xs font-medium"> Profile </small>
                    </NavLink>
                    <hr className="dark:border-gray-700/60" />
                    <NavLink to={'/setting'} className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 hover:scale-125 duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <small className="text-center text-xs font-medium"> Settings </small>
                    </NavLink>
                </nav>
            </div>
        </nav> : null}

    </>
    )
}
