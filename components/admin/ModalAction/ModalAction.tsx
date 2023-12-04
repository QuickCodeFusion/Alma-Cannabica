import React from "react";
import { Config } from "@/components/button/admin/IconBtn";
import UserButton from "@/components/button/admin/userButton";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";

interface props {
    user: any
    handleBan: (userId: string) => void
    handleUnban: (userId: string) => void
    handleGiveAdmin: (userId: string) => void
    handleRemoveAdmin: (userId: string) => void
}
export const ModalAction: React.FC<props> = ({ user, handleBan, handleUnban, handleGiveAdmin, handleRemoveAdmin }): JSX.Element => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="flex flex-col gap-2">
            <Button isIconOnly variant="flat" className='sm:hidden' onPress={onOpen}><Config /></Button>

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
                                <div >
                                    <p>Habilitar o Deshabilitar usuario</p>
                                    {
                                    user.disabled
                                    ? <UserButton  icon='enable' txtColor='green' btnColor='success' action={() => { handleUnban(user.uid) }} />
                                    : <UserButton  icon='disable' txtColor='red' btnColor='danger' action={() => { handleBan(user.uid) }} />
                                    }
                                </div>
                                <div>
                                    <p>Agregar o quitar Admin</p>
                                {
									user.customClaims?.admin
										?  <UserButton icon='remove'  txtColor='yellow' btnColor='warning' action={() => { handleRemoveAdmin(user.uid) }} />
										:  <UserButton icon='grant'  txtColor='blue' btnColor='primary' action={() => { handleGiveAdmin(user.uid) }} />
                                }
                                </div>

                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}