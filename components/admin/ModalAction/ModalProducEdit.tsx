import React from "react";
import { Config } from "@/components/button/admin/IconBtn";
import CreateProduct from "@/components/form/CreateProduct";
import style from './ModalAction.module.css';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, } from "@nextui-org/react";

type product = {
    category: string,
    description: string,
    image: string,
    itemId: string,
    name: string,
    price: string,
    nameToLowerCase: string
}
export const ModalProductEdit = ({product}:{product:product}): JSX.Element => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="flex flex-col gap-2">
            <Button isIconOnly variant="flat" onPress={onOpen}><Config /></Button>

            <Modal
                isOpen={isOpen}
                placement="center"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Acciones</ModalHeader>
                            <ModalBody >
                                <CreateProduct/>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}