import { LogoInstagram, LogoWhat } from './LogoSocial'
import { Tooltip } from '@nextui-org/react'
import logo from '@/public/logo.png'
import Link from 'next/link'

const Footer = (): JSX.Element => {
	return (
		<div className='flex justify-between mt-2 py-4 px-4 w-full bg-white shadow-small'>
			<div className='flex w-1/2 flex-wrap gap-8 justify-between'>
				<div>
					<img src={logo.src} alt='logo' width={50} />
				</div>
				<div>
					<p className='text-sm'>Alma Canabica</p>
					<p className='text-xs'> Buenos Aires, Argentina</p>
					<p className='text-xs'>© 2023. Todos los derechos reservados.</p>
				</div>
				<div className='flex flex-col gap-0'>
					<p className='text-sm'>Contacto</p>
					<p className='text-xs'>+54 9 11 2793-8262</p>
					<Link className='text-xs' href='mailto:almacannabicawork@gmail.com'>almacannabicawork@gmail.com</Link>
				</div>
			</div>
			<div className='flex w-1/3 self-start md:self-center md:w-1/12 justify-around'>
				<div className='rounded-full h-fit p-1 bg-gray-300/70 hover:bg-fuchsia-600 hover:shadow-black LogoInstagram'>
					<Tooltip offset={15} content='Instagram'>
						<Link href="https://www.instagram.com/lauramarielacevedo?igsh=M2VmaHloZXdnbDNs" className='rounded-full'><LogoInstagram /></Link>
					</Tooltip>
				</div>
				<div className='rounded-full h-fit p-1 bg-gray-300/70 hover:bg-green-500 hover:shadow-black'>
					<Tooltip offset={15} content='Whatsapp'>
						<Link href="https://wa.me/c/5491127938262"><LogoWhat /></Link>
					</Tooltip>
				</div>
			</div>
		</div>
	)
}

export default Footer
