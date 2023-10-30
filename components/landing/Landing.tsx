"use client";
import style from "./landing.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation"
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import { Button } from "@nextui-org/react";

const Landing = () => {
	return (
		<div className={style.containerLanding}>
			<div className={style.container}>
				<h1>¿Sabias que?</h1>
				<div>
					<p>
						La marihuana medicinal se puede utilizar para: Aliviar el dolor. <br />
						 Esto incluye distintos tipos de dolor crónico, incluso dolor por lesiones nerviosas. <br /> 
						 					Controlar las náuseas y los vómitos.
					</p>
					<br />
					<Button color="success" radius="sm"> 
						Ingresar
					</Button>
				</div>
				<div className={style.carouselCard}>
					<Swiper
						effect={"coverflow"}
						grabCursor={true}
						centeredSlides={true}
						loop={true}
						slidesPerView={"auto"}
						modules={[EffectCoverflow, Pagination, Navigation,Autoplay]}
						coverflowEffect={
							{
								rotate:0,
								stretch:0,
								depth:100,
								modifier:2.5,
							}
						}
						pagination={{el:"", clickable:true}}
						navigation={{
							nextEl:"swiper-button-next",
							prevEl:"swiper-button-prev",
							
						}}
						style={{display: "flex", justifyContent:"center", alignItems:"center"}}
						autoplay={{ delay: 3000 }}
					>
						<SwiperSlide className={style.containerCard}>
							<img src="https://www.southernliving.com/thmb/xGM6Ski6FeYVMXTqO6aLMdBhO40=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-950144624-1-6a35c70e76354f3aa5657878f59dfbe6.jpg" className={style.cardInfo} alt="" />
						</SwiperSlide>
						<SwiperSlide className={style.containerCard}>
							<img src="https://www.southernliving.com/thmb/xGM6Ski6FeYVMXTqO6aLMdBhO40=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-950144624-1-6a35c70e76354f3aa5657878f59dfbe6.jpg" className={style.cardInfo} alt="" />
						</SwiperSlide>
						<SwiperSlide className={style.containerCard}>
							<img className={style.cardInfo} src="https://www.aumanns.com.au/wp-content/uploads/2022/12/cottagecore-garden-300x200.jpg" alt="" />
						</SwiperSlide>
						<SwiperSlide className={style.containerCard}>
							<img className={style.cardInfo} src="https://www.aumanns.com.au/wp-content/uploads/2022/12/cottagecore-garden-300x200.jpg" alt="" />
						</SwiperSlide>
						<SwiperSlide className={style.containerCard}>
							<img src="https://www.bhg.com/thmb/ZyWx58F1NvdvaWqRsuGg-iCCdS0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/salvia-patens-blue-angel-f91454f1-a3735fdc87314cc5985fa93e7b45c392.jpg" className={style.cardInfo}  alt="" />
						</SwiperSlide>
						<SwiperSlide className={style.containerCard}>
							<img src="https://www.bhg.com/thmb/ZyWx58F1NvdvaWqRsuGg-iCCdS0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/salvia-patens-blue-angel-f91454f1-a3735fdc87314cc5985fa93e7b45c392.jpg" className={style.cardInfo}  alt="" />
						</SwiperSlide>
						<SwiperSlide className={style.containerCard}>
							<img src="https://www.bhg.com/thmb/mbeTTyakvz0lQ5SWbDPQPDEbXVs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/endless-summer-blue-hydrangea-macrophylla-c38f20fe-da0331cb73c94b9db10b6bf74e098356.jpg" className={style.cardInfo} alt="" />
						</SwiperSlide>
						<SwiperSlide className={style.containerCard}>
							<img src="https://www.bhg.com/thmb/mbeTTyakvz0lQ5SWbDPQPDEbXVs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/endless-summer-blue-hydrangea-macrophylla-c38f20fe-da0331cb73c94b9db10b6bf74e098356.jpg" className={style.cardInfo} alt="" />
						</SwiperSlide>
						<SwiperSlide className={style.containerCard}>
							<img src="https://www.bhg.com/thmb/AgaS7xoNefEQPQkvY7FkiYGimrY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Blue-delphinium-103106016-db986fe1e072483db329a105a7147890.jpg" className={style.cardInfo} alt="" />
						</SwiperSlide>
						<SwiperSlide className={style.containerCard}>
							<img src="https://www.bhg.com/thmb/AgaS7xoNefEQPQkvY7FkiYGimrY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Blue-delphinium-103106016-db986fe1e072483db329a105a7147890.jpg" className={style.cardInfo} alt="" />
						</SwiperSlide>
						<SwiperSlide className={style.containerCard}>
							<img src="https://www.bhg.com/thmb/x-ylRCy4sVSN0XZ3RUINazvpmH0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/clematis-growing-in-field-b24c24f6-14c0ca07b58e4f1cbfd3e16c697255bb.jpg" className={style.cardInfo} alt="" />
						</SwiperSlide>
						<SwiperSlide className={style.containerCard}>
							<img src="https://www.bhg.com/thmb/x-ylRCy4sVSN0XZ3RUINazvpmH0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/clematis-growing-in-field-b24c24f6-14c0ca07b58e4f1cbfd3e16c697255bb.jpg" className={style.cardInfo} alt="" />
						</SwiperSlide>
						
					</Swiper>
				</div>
			</div>
		</div>
	);
};

export default Landing;
