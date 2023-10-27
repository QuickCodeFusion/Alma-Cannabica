"use client";
import style from "./landing.module.css";
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
			</div>
		</div>
	);
};

export default Landing;
