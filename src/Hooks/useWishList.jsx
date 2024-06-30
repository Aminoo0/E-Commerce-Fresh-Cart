import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useState } from 'react'

export default function useWishList() {
    function addWishList(values) {
        // console.log(values);
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId: values
        }, {
            headers: { token: localStorage.getItem('userToken') }
        })
            .then((response) => response)
            .catch((err) => err)
    }

    function getAllWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers: { token: localStorage.getItem('userToken') }
        })
    }
    let qeury = useQuery({
        queryKey: ['getAllWishList'],
        queryFn: getAllWishList,
        refetchInterval: 1,
    })

    function removeFromWishList(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers: { token: localStorage.getItem('userToken') }
        })
            .then((response) => response)
            .catch((err) => err)
    }

    return { addWishList, removeFromWishList, qeury }
}
