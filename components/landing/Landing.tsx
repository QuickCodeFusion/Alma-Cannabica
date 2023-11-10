"use client";
import style from "./landing.module.css";
import CardAricule from "../card/Card";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation"
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import { useGetCarouselQuery } from "@/redux/service/carouselAPI";
import { useDispatch, useSelector } from "@/redux/hooks";

const Landing = () => {

	const { data, error, isLoading } = useGetCarouselQuery(null)
	console.log(data);
	console.log(isLoading);


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
						modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
						coverflowEffect={
							{
								rotate: 0,
								stretch: 0,
								depth: 100,
								modifier: 2.5,
							}
						}
						style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", height: 290, paddingTop:10 }}
						autoplay={{ delay: 3000 }}
					>
						{data?.map((product , index) => (
							<SwiperSlide style={{width:190}} key={index} className={style.containerCard}>
								<CardAricule key={product.itemId} product={product} />
							</SwiperSlide>
						))

						}


					</Swiper>
				</div>
			</div>
		</div>
	);
};

export default Landing;
