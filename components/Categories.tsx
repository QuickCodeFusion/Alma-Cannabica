'use client'

import { Chip, Spacer } from '@nextui-org/react'
import Tag from './icons/Tag'

interface props {
	categories: string[] | string
}

const Categories: React.FC<props> = ({ categories }): React.JSX.Element => {
	return (
		<div className='flex flex-wrap gap-0 p-0'>
			{categories instanceof Array
				? (
					categories.map((category) => (
						<>
							<Chip
								key={category}
								variant='dot'
								size='sm'
								startContent={<Tag />}
							>

								{category}
							</Chip>
							<Spacer x={0.5} />
						</>
					))
				)
				: (
					<>
						<Chip
							key={categories}
							variant='dot'
							startContent={<Tag />}
						>
							{categories}
						</Chip>
						<Spacer x={0.5} />
					</>
				)
			}
		</div>
	)
}

export default Categories
