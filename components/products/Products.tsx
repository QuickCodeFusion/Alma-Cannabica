'use client'
import Cards from "../cards/Cards"
import Filters from "../filters/Filter"
import style from './products.module.css'
import {  useState } from 'react'
import { Button, ButtonGroup } from "@nextui-org/react";

const Products = () : JSX.Element => {
    const [Filter, setMfiler]=useState(false)
    const onChange = () => {
		setMfiler(true)
	}
    return (
        <div className={style.container}>
            <div>
                <Button onClick={()=> onChange()} size="sm" className={style.filterBtn} color="primary" variant="flat">
                    Filtros
                </Button>
                <Filters onFilter={Filter} onClose={()=> setMfiler(false)} />
            </div>
            <div className={style.cards}>
                <Cards />
            </div>
        </div>
    )
}

export default Products
