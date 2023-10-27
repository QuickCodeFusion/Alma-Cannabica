'use client';
import {type ChangeEvent} from 'react';
import style from './filterSort.module.css'

type FiltersSortProps = {
	valueState: {
		order: string;
	};
	onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const FilterSort: React.FC<FiltersSortProps> = ({valueState, onChange}) => (
	<div>
		<div className={style.catCont}>
			<label htmlFor='order' className={style.catTitle}>Ordernar:</label>
			<select name='order' value={valueState.order} onChange={onChange} className={style.selectCat}>
				<option value=''>None</option>
				<option value='lower'>De menor a mayor</option>
				<option value='higher'>De mayor a menor</option>
			</select>
		</div>
	</div>
);

export default FilterSort;