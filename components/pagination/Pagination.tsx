'use client'
import { useDispatch } from '@/redux/hooks'

const Pagination = (): React.JSX.Element => {
	const dispatch = useDispatch()

	const changePage = (page) => {
		if (page === 'derc') {
		} else {
		}
	}
	return (
		<div>
			<button onClick={() => {
				changePage('izq')
			}}> izq </button>
			<button onClick={ () => { changePage('derc') }}> derc </button>
		</div>
	)
}

export default Pagination
