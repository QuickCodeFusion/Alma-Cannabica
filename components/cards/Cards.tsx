'use client'
import { useGetAllProductsQuery } from "@/redux/service/productsAPI"
import Card from "../card/Card"

const Cards = () => {

    const {data : products, isLoading, isError} = useGetAllProductsQuery(null) 


    return (
        <div>
            {
                isLoading ?
                <div>Loading...</div> 
                :
                (
                    products?.map((product) => {
                        return (
                            <Card product={product}/>
                        )
                    } )
                )
            }
        </div>
    )
}

export default Cards