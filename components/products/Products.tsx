'use client'
import Cards from '../cards/Cards'
import Filters from '../filters/Filter'
import style from './products.module.css'
import { useState } from 'react'
import { Button, ButtonGroup, Card } from '@nextui-org/react'

const Products = (): JSX.Element => {
	const [Filter, setMfiler] = useState(false)
	const onChange = () => {
		setMfiler(true)
	}
	return (
		<div className='flex flex-col md:items-start md:justify-around w-full'>
			<Card classNames={{
				base: 'md:my-10'
			}}>
				<Button onClick={() => { onChange() }} size="sm" className={style.filterBtn} color="primary" variant="flat">
                    Filtros
				</Button>
				<Filters onFilter={Filter} onClose={() => { setMfiler(false) }} />
			</Card>
			<>
				<Cards />
			</>
		</div>
	)
}

export default Products
