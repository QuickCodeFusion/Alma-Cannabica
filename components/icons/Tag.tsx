import svg from '@/public/tag.svg'
import Image from 'next/image'

const Tag = (): React.JSX.Element => {
	return (
		<Image
			src={svg}
			alt="categoria"
			width={20}
			height={20}
		/>
	)
}

export default Tag
