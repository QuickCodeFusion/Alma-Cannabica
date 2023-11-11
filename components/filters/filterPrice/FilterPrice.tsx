'use client';
import { type ChangeEvent } from 'react';
import style from './filterPrice.module.css';
import { Input } from "@nextui-org/react";

type FiltersPriceProps = {
	valueState: {
		minPrice: string;
		maxPrice: string;
	};
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FilterPrice: React.FC<FiltersPriceProps> = ({ valueState, onChange }) => (
	<div>
		<p className='font-semibold text-green-500'>Precio</p>
		<div className={style.priceCont}>
			<div className={style.divPrice}>
				<Input
					type='number'
					label='Min'
					placeholder='0'
					labelPlacement='outside'
					variant='underlined'
					color='success'
					//value={valueState.minPrice}
					onChange={onChange}
					startContent={
						<div className="pointer-events-none flex items-center">
							<span className="text-default-400 text-small">$</span>
						</div>
					}
				/>
			</div>
			<div className={style.separation}></div>
			<div className={style.divPrice}>
				<Input
					type='number'
					label="Max"
					placeholder='0'
					labelPlacement='outside'
					variant='underlined'
					color='success'
					//value={valueState.maxPrice}
					onChange={onChange}
					startContent={
						<div className="pointer-events-none flex items-center">
							<span className="text-default-400 text-small">$</span>
						</div>
					}
				/>
			</div>
		</div>
	</div>
);

export default FilterPrice;