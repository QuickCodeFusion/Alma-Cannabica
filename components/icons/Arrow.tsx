const Arrow = ({ className, onClick, style, direction }: any): React.JSX.Element => {
	return (
		<div
			className={className}
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
						strokeWidth={2.5}
						stroke='currentColor'
						className='h-10 w-10 text-green-500 active:scale-110'
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
						strokeWidth={2.5}
						stroke='currentColor'
						className='h-10 w-10 text-green-500 font-bold active:scale-110'
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
