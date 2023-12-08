import React from "react";
import { Config } from "@/components/button/admin/IconBtn";
import { ModalEdit } from "./ModalEdit";
import { Remove, EditIcon, Grant } from "@/components/button/admin/IconBtn";
import style from './ModalAction.module.css';
import { Product } from "@/types/Product/type";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Tooltip } from "@nextui-org/react";

export const ModalProductEdit = ({product}:{product:Product}): JSX.Element => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="flex flex-col gap-2">
            <Button isIconOnly color="primary" onPress={onOpen}><Config /></Button>

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
                                <div className="flex flex-col gap-2 text-center">
                                    <h4 className="text-green-600 font-semibold">Eliminar del carrusel</h4>
                                    <Tooltip color="danger" content="Eliminar">
                                        <Button   color="danger"> <Remove/> </Button>
                                    </Tooltip>
                                </div>
                                <div className="flex flex-col gap-2 text-center">
                                    <h4 className="text-green-600 font-semibold">Agregar Carrusel</h4>
                                    <Tooltip color="success" content="Agregar">
                                        <Button  color="success"> <Grant/> </Button>
                                    </Tooltip>
                                </div>
                                <div className="flex flex-col gap-2 text-center">
                                    <h4 className="text-green-600 font-semibold">Editar Producto</h4>
                                    <ModalEdit product={product} preOnClose={onClose}/>
                                </div>

                                
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}