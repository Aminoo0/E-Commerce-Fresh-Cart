import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useAllproducts() {

    let response = useQuery({
        queryKey: ['curentProduct'],
        queryFn: getCurentProducts,
        select:(data)=> data?.data.data,
        staleTime: 60000,
    })
    function getCurentProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    
    return response
}
