import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip } from "@nextui-org/react";
import { EditIcon } from "@/components/button/admin/IconBtn";
import EditProduct from "@/components/form/EditProduct";
import { Product } from "@/types/Product/type";
export const ModalEdit = ({preOnClose, product}:{preOnClose:()=>void, product:Product}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpen = () => { 
        onOpen(); 
    };


    return (
        <>
            <div className="flex flex-wrap gap-3">
                <Tooltip  color="primary" content="Editar">
                    <Button onClick={handleOpen} color="primary"> <EditIcon /> </Button>

                </Tooltip>
            </div>
            <Modal
                size="full"
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody className="overflow-auto">
                                <EditProduct item={product}/>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
