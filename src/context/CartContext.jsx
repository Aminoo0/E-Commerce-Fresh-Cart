import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";

export let cartContext = createContext(0);


export function CartContextProvider(props) {

    let getAllUserCart = () => {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: { token: localStorage.getItem('userToken') }
        })
    }

    let data = useQuery({
        queryKey: ['getAllUserCart'],
        queryFn: getAllUserCart,
        refetchInterval: 1,
    })
    // console.log(data);


    let addToCart = (productId) => {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: productId,
        }, {
            headers: { token: localStorage.getItem('userToken') },
        }).then((response) => response)
            .catch((error) => error)
    }

    let deleteFromCart = (productId) => {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers: { token: localStorage.getItem('userToken') }
        })
            .then((response) => response)
            .catch((error) => error)
    }

    let updateCart = (productId, count) => {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count: count
        }, {
            headers: { token: localStorage.getItem('userToken') }
        })
            .then((response) => response)
            .catch((err) => err)
    }

    function payment(cartId, url, formValues) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
            shippingAddress: formValues
        }, {
            headers: { token: localStorage.getItem('userToken') }
        })
    }

    let paymentData = useMutation({
        mutationKey: ['payment'],
        mutationFn: payment
    })


    return <cartContext.Provider value={{ addToCart, deleteFromCart, updateCart, payment, data }}>
        {props.children}
    </cartContext.Provider>
}