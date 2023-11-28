import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import style from "../filter.module.css"
import FilterPrice from "../filterPrice/FilterPrice";
import FilterSort from "../filterSort/FilterSort";
import FilterCategories from "../filterCategory/FilterCategory";
import { type ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useGetFiltersQuery } from "@/redux/service/productsFilterAPI";
import { loadProducts } from "@/redux/feature/productsSlice";
import { useDispatch } from "@/redux/hooks";
import { useEffect } from "react";

export const FilterModal = ({ onFilter }: { onFilter: boolean }): JSX.Element => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const dispatch = useDispatch();
    const name = useSelector((state: any) => state.searchBar.value);
    const [valueState, setValueState] = useState({
        category: "",
        order: "",
        name: name,
        minPrice: "",
        maxPrice: "",
    });
    

    useEffect(() => {
        if (onFilter) {
            onOpen();
        }
        setValueState((prevState) => {
            return {
                ...prevState,
                name: name,
            };
        });
    }, [name, onFilter, onOpen]);

    const onChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ): void => {
        const { name, value } = event.target;
        setValueState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const {
        data: products,
        isLoading,
        isError,
    } = useGetFiltersQuery({
        name: valueState.name,
        minPrice: valueState.minPrice,
        maxPrice: valueState.maxPrice,
        category: valueState.category,
        order: valueState.order,
    });

    const handleSubmit = (): void => {
        onClose();
        if (isError) {
            dispatch(loadProducts({ products: [], isLoading, isError }));
        } else {
            dispatch(loadProducts({ products, isLoading, isError }));
        }
    };

    return (
        <>
            <div className="flex flex-wrap gap-3">
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
                <ModalContent className={style.ModalFilter}>
                    {(onClose) => (
                        <>
                            
                            <ModalBody >
                                <div className={style.subContainer}>
                                    <div>
                                        <FilterPrice valueState={valueState} onChange={onChange} />
                                    </div>
                                    <div>
                                        <FilterSort valueState={valueState} onChange={onChange} />
                                    </div>
                                    <div>
                                        <FilterCategories valueState={valueState} onChange={onChange} />
                                    </div>
                                    <div className={style.button}>
                                        <Button onClick={handleSubmit} variant="flat" color="success">
                                            Aplicar
                                        </Button>
                                    </div>
                                </div>
                            </ModalBody>
                            
                        </>
                    )}
                </ModalContent>

            </Modal>
        </>
    );
}
