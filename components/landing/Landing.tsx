"use client";
import style from "./landing.module.css";
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
						pagination={{ el: "", clickable: true }}
						navigation={{
							nextEl: "swiper-button-next",
							prevEl: "swiper-button-prev",

						}}
						style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute" }}
						autoplay={{ delay: 3000 }}
					>
						{data?.map((product, index) => (
							<SwiperSlide key={index} className={style.containerCard}>
								<Card className={style.cardCarusel} key={index} isPressable onPress={() => console.log("item pressed")}>
									<Image
										style={{ borderRadius: 0 }}
										className={style.cardImage}
										src="https://www.southernliving.com/thmb/xGM6Ski6FeYVMXTqO6aLMdBhO40=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-950144624-1-6a35c70e76354f3aa5657878f59dfbe6.jpg"
									/>

									<CardFooter className={style.cardFooter}>
										<b className={style.nameProduct}>{product.name}</b>
										<div className={style.btnCard}>
											<p className="text-600">{product.price}</p>
											<Button isIconOnly color="success" variant="bordered" >
												+
											</Button>
										</div>
									</CardFooter>
								</Card>
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
