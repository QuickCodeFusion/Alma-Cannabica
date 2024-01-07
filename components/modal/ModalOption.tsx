import React from "react";
import { useEffect, useState } from 'react'
import { getPreferenceUrlSingle } from '@/utils/checkoutUtils'
import { toast } from 'sonner'
import { CheckBox } from "./CheckBox/CheckBox";
import { Product } from "@/types/Product/type";
import { CartProduct } from "@/types/User/types";
import { MercadoPagoIcon } from "../icons/MercadoPago";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Link } from "@nextui-org/react";

export const ModalOption = ({ product }: {
    product: Product
}) => {
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

            <>
                <p className="flex flex-col gap-1">Preferencias</p>
                <div>
                    <CheckBox handleActive={handleActive} active={active} />
                </div>
                <div>
                    <Button
                        isDisabled={active}
                        isExternal
                        showAnchorIcon
                        anchorIcon={<MercadoPagoIcon />}
                        color='success'
                        as={Link}
                        href={preferenceUrl}
                        className='text-white text-lg'
                    >Comprar</Button>
                    <Button color="danger">
                        Cancelar
                    </Button>
                </div>
            </>
        </div>
    );
}
