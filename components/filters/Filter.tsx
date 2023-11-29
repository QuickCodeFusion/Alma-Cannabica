"use client";
import FilterPrice from "./filterPrice/FilterPrice";
import { type ChangeEvent, useState } from "react";
import FilterSort from "./filterSort/FilterSort";
import FilterCategories from "./filterCategory/FilterCategory";
import { FilterModal } from "./filterModal/FilterModal";
import { Button } from "@nextui-org/react";
import style from "./filter.module.css";
import { useSelector } from "react-redux";
import { useGetFiltersQuery } from "@/redux/service/productsFilterAPI";
import { loadProducts } from "@/redux/feature/productsSlice";
import { useDispatch } from "@/redux/hooks";
import { useEffect } from "react";

const Filters = ({
  onFilter,
}: {
  onFilter: boolean;
}): JSX.Element => {
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
    setValueState((prevState) => {
      return {
        ...prevState,
        name: name,
      };
    });
  }, [name]);

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
    if (isError) {
      dispatch(loadProducts({ products: [], isLoading, isError }));
    } else {
      dispatch(loadProducts({ products, isLoading, isError }));
    }
  };

  return (
    
    <div className={style.container}>
      <FilterModal onFilter={onFilter}/> 
      
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
    </div>
    
  );
};
export default Filters;
