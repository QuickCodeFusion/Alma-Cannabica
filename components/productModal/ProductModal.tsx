"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Detail from "../detail/Detail";

const ProductModal = ({
  isOpen,
  onOpenChange,
  product,
}: any): React.JSX.Element => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <Detail product={product} />
              </ModalBody>
              <ModalFooter>
                <Button color="success" className="text-white">
                  COMPRAR
                </Button>
                <Button isIconOnly color="success" variant="bordered">
                  <p className="scale-150 font-bold mb-1">+</p>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductModal;
