import React from "react";
import { useEffect, useState } from 'react'
import { getPreferenceUrl } from '@/utils/checkoutUtils'
import { toast } from 'sonner'
import { CheckBox } from "./CheckBox/CheckBox";
import { Product } from "@/types/Product/type";
import { CartProduct } from "@/types/User/types";
import { MercadoPagoIcon } from "../icons/MercadoPago";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Link } from "@nextui-org/react";

interface props {
	products: CartProduct[]
}
export const ModalCart: React.FC<props>  = ({ products }):React.JSX.Element => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [preferenceUrl, SetPreferenceUrl] = useState<string>('')
    const [active, setActive] = useState(true)

    const handleActive = () => {
        setActive(!active)
    }
    useEffect(() => {
		if (products) {
			getPreferenceUrl(products)
				.then((url) => {
					SetPreferenceUrl(url)
				})
				.catch((error) => {
					console.error(error)
					toast.error(error.message)
				})
		}
	}, [products])
    return (
        <div className="flex flex-col gap-2 ">
            <Button className='text-white text-lg' color="success" onPress={onOpen} >Comprar</Button>

            <Modal
                isOpen={isOpen}
                placement='center'
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Preferencias</ModalHeader>
                            <ModalBody>
                                <CheckBox handleActive={handleActive}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    isExternal
                                    showAnchorIcon
                                    anchorIcon={<MercadoPagoIcon />}
                                    color='success'
                                    as={Link}
                                    href={preferenceUrl}
                                    className='text-white text-lg'
                                >Comprar</Button>
                                <Button color="danger" onPress={onClose}>
                                    Cancelar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}