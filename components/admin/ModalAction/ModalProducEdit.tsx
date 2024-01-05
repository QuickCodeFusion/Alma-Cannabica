import React from "react";
import { Config } from "@/components/button/admin/IconBtn";
import { ModalEdit } from "./ModalEdit";
import { Remove, Grant } from "@/components/button/admin/IconBtn";
import { useCreateArticuleMutation, useDeleteArticuleMutation } from "@/redux/service/carouselAPI";
import { useDeleteProductMutation } from "@/redux/service/productsAPI";
import { Product } from "@/types/Product/type";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";

export const ModalProductEdit = ({ product, limit, exist, handleUpdate }: { product: Product, limit: boolean, exist: boolean, handleUpdate: (boolean: boolean) => void }): JSX.Element => {


    const [createArticule] = useCreateArticuleMutation();
    const [deleteArticule] = useDeleteArticuleMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const handleCreateArticule = async (nuevoArticulo: Product) => {
        try {
            const response = await createArticule(nuevoArticulo);
            if (response !== null || response !== undefined)handleUpdate(true);
            else handleUpdate(false);

        } catch (error) {
            console.log(error)
        }
    };
    const handleDeleteArticule = async (id: Product) => {
        try {
            const response = await deleteArticule(id);
            if (response !== null || response !== undefined)handleUpdate(true);
            else handleUpdate(false);
        } catch (error) {
            console.log(error)
        }
    }
    const handleDeleteProduct = async (id: string) => {
        try {
            const response = await deleteProduct(id);
            if (response !== null || response !== undefined)handleUpdate(true);
            else handleUpdate(false);
            
        }catch (error) {
            console.log(error)
        }   
    }
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
                                    {exist ? (
                                        <>
                                            <h4 className="text-green-600 font-semibold">Eliminar del carrusel</h4>
                                            <Button color="warning" isDisabled={!exist} onClick={() => { handleDeleteArticule(product) }} onPress={onClose}> <Remove /> </Button>
                                        </>
                                    ) : (
                                        <>
                                            <h4 className="text-green-600 font-semibold">Agregar Carrusel</h4>
                                            <Button color="success" isDisabled={exist || limit} onClick={() => { handleCreateArticule(product) }} onPress={onClose}> <Grant /> </Button>
                                        </>
                                    )}
                                </div>


                                <div className="flex flex-col gap-2 text-center">
                                    <h4 className="text-green-600 font-semibold">Eliminar Producto</h4>
                                    <Button color="danger" onClick={() => { handleDeleteProduct(product.itemId) }} onPress={onClose}> <Remove /> </Button>
                                </div>
                                <div className="flex flex-col gap-2 text-center">
                                    <h4 className="text-green-600 font-semibold">Editar Producto</h4>
                                    <ModalEdit product={product} preOnClose={onClose} />
                                </div>


                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}