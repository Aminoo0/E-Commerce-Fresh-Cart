import React, { useContext } from 'react'
import { useState } from 'react'
import style from './ProtectedRouter.module.css'
import { useEffect } from 'react'
import { allContext } from '../../context/ContextContainer'
import { Navigate } from 'react-router-dom'
import Login from '../Login/Login'

export default function ProtectedRouter(props) {


    if (localStorage.getItem('userToken')) {
        return props.children
    } else {
        return <Navigate  to={'/login'}/>
    }

}
