import svg from '@/public/tag.svg'
import Image from 'next/image'

const Tag = (): React.JSX.Element => {
	return (
		<Image
			src={svg}
			alt="categoria"
			width={15}
			height={15}
		/>
	)
}

export default Tag
