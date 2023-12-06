const Arrow = ({ className, onClick, style, direction }: any): React.JSX.Element => {
	return (
		<div
			className={
				direction === 'right'
					? 'absolute top-1/2 right-0 z-10 -translate-y-1/2 cursor-pointer'
					: 'absolute top-1/2 left-0 z-10 -translate-y-1/2 cursor-pointer'
			}
			style={{
				...style
			}}
			onClick={onClick}
		>
			{direction === 'right'
				? (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='h-6 w-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M8.25 4.5l7.5 7.5-7.5 7.5'
						/>
					</svg>
				)
				: (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='h-6 w-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 19.5L8.25 12l7.5-7.5'
						/>
					</svg>
				)}
		</div>
	)
}

export default Arrow
