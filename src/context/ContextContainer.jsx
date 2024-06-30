import { createContext, useEffect, useState } from "react";




export let allContext = createContext(0)

export function ContextContainerProvider(props) {

    const [userlogin, setUserLogin] = useState(null)

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            setUserLogin(localStorage.getItem('userToken'))
        }
    }, [])

    return <allContext.Provider value={{ userlogin, setUserLogin }}>
        {props.children}
    </allContext.Provider>
}