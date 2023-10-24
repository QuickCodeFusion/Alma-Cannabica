"use client";
import SubmitButton from "../button/submitButton";
import { useCreateProductMutation } from "@/redux/service/productsAPI";
import { useState } from "react";

const CreateProduct = () => {
	const [product, setProduct] = useState({
		name: "",
		description: "",
		price: "",
		image: "",
	});
	const [createProduct] = useCreateProductMutation();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProduct({
			...product,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		createProduct(product)
			.finally(() => {
				alert("Has iniciado sesión exitosamente");
			});
	};


    
	return (
		<div>
			<h1>Create Product</h1>
			<form onSubmit={handleSubmit} method="POST">
				<input type="text" placeholder="Name" onChange={handleChange}/>
				<input type="text" placeholder="Description" onChange={handleChange}/>
				<input type="text" placeholder="Price"  onChange={handleChange}/>
				<input type="text" placeholder="Image URL" onChange={handleChange}/>
				<SubmitButton title="Create Product"/>
			</form>
		</div>
	);
};

export default CreateProduct;