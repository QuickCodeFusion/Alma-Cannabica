import style from './footer.module.css'
import { LogoInstagram, LogoWhat } from './LogoSocial'
import { Tooltip } from '@nextui-org/react'
import logo from '@/public/logo.png'
const Footer = () => {
	return (
		<div className={style.container}>
			<div className={style.info}>
				<div>
				<img src={logo.src} alt='logo' width={50} />
				</div>
				<div>
					<p className='text-sm'>Alma Canabica</p>
					<p className='text-xs'> San Juan, Argentina</p>
					<p className='text-xs'>© 2023. Todos los derechos reservados.</p>
				</div>
				<div>
					<p className='text-sm'>Contacto</p>
					<p className='text-xs'>+54 9 11 2793-8262</p>
					<p className='text-xs'>almacannabicawork@gmail.com</p>
				</div>
			</div>
			<div className={style.logo}>
				<div className={style.LogoInstagram}>
					<Tooltip offset={15} content='Instagram'>
						<a href="https://www.instagram.com/lauramarielacevedo?igsh=M2VmaHloZXdnbDNs" className='rounded-full'><LogoInstagram  /></a>
					</Tooltip>
				</div>
				<div className={style.LogoWhat}>
					<Tooltip offset={15} content='Whatsapp'>
						<a href="https://wa.me/c/5491127938262"><LogoWhat /></a>
					</Tooltip>
				</div>
			</div>
		</div>
	)
}

export default Footer
