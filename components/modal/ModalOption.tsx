import React from "react";
import { useEffect, useState } from 'react'
import { getPreferenceUrlSingle } from '@/utils/checkoutUtils'
import { toast } from 'sonner'
import { CheckBox } from "./CheckBox/CheckBox";
import { Product } from "@/types/Product/type";
import { CartProduct } from "@/types/User/types";
import { MercadoPagoIcon } from "../icons/MercadoPago";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Link } from "@nextui-org/react";

export const ModalOption = ({ product, onPreClose }: { product: Product,
    onPreClose: () => void  }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [preferenceUrl, SetPreferenceUrl] = useState<string>('')
    const [active, setActive] = useState(true)

    const handleActive = () => {
        setActive(!active)
    }

    useEffect(() => {
        if (product) {
            getPreferenceUrlSingle(product)
                .then((url) => {
                    SetPreferenceUrl(url)
                })
                .catch((error) => {
                    console.error(error)
                    toast.error(error.message)
                })
        }
    }, [product])
    return (
        <div className="flex flex-col gap-2">
            <Button className='text-white text-lg' color="success" onPress={onOpen} onClick={onPreClose} >Comprar</Button>

            <Modal
                isOpen={isOpen}
                placement='center'
                onOpenChange={onOpenChange}
                isDismissable = { false }
                hideCloseButton={ true }
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
                                    isDisabled={active}
                                    isExternal
                                    showAnchorIcon
                                    anchorIcon={<MercadoPagoIcon />}
                                    color='success'
                                    as={Link}
                                    href={preferenceUrl}
                                    className='text-white text-lg'
                                    onPress={onClose}
                                >Comprar</Button>
                                <Button color="danger" onPress={onClose} onClick={onPreClose}>
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
