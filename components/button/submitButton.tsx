"use client";
import { Button } from "@nextui-org/react";

const SubmitButton = ({title}: {title: string}) => {
	return (
		<div>
			<Button type="submit">{title}</Button>
		</div>
	);
};

export default SubmitButton;
