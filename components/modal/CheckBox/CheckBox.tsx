import React, { useState } from "react";
import { Checkbox, Input } from "@nextui-org/react";
import style from "./CheckBox.module.css";

export const CheckBox = () => {
  const [tienda, setTienda] = useState(false);
  const [domi, setDomi] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleTiendaChange = () => {
    setTienda(true);
    setDomi(false);
  };

  const handleDomiChange = () => {
    setTienda(false);
    setDomi(true);
  };

  const handlePhoneInputChange = (evento: any) => {
    setPhoneNumber(evento.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <Checkbox
        color="success"
        isSelected={tienda}
        onValueChange={handleTiendaChange}
      >
        Recoger En Tienda
      </Checkbox>
      <Checkbox
        color="success"
        isSelected={domi}
        onValueChange={handleDomiChange}
      >
        Gestionar Domicilio
      </Checkbox>
      <div className={domi ? `${style.inputcontainer} ${style.visible}`: `${style.inputcontainer}`}>
        <Input
          placeholder="Ingrese número de teléfono"
          value={phoneNumber}
          onChange={handlePhoneInputChange}
        />
      </div>
    </div>
  );
};

