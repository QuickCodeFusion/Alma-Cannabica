'use client';
import { type ChangeEvent } from 'react';
import style from './filterSort.module.css'
import { Select, SelectItem } from "@nextui-org/react";

type FiltersSortProps = {
  valueState: {
    order: string;
  };
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const FilterSort: React.FC<FiltersSortProps> = ({ valueState, onChange }) => (
  <div>
    <div className={style.catCont}>
      <Select
        size="sm"
        label="Ordenar"
        color="success"
        variant="underlined"
        placeholder="None"
        
        onChange={onChange}
        
      >
        <SelectItem key="1" value=''>
          None
        </SelectItem>
        <SelectItem key="2" value='lower' style={{ width: 160 }}>
          De menor a mayor
        </SelectItem>
        <SelectItem key="3" value='higher' style={{width:160}}>
          De mayor a menor
        </SelectItem>
      </Select>
    </div>
  </div>
);

export default FilterSort;