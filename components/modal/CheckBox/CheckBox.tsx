import React, { useState } from "react";
import { Checkbox, Input, Button } from "@nextui-org/react";

export const CheckBox = () => {
  const [tienda, setTienda] = useState(false);
  const [domi, setDomi] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showButton, setShowButton] = useState(false);

  const handleTiendaChange = () => {
    setTienda(true);
    setDomi(false);
    setShowButton(false);
  };

  const handleDomiChange = () => {
    setTienda(false);
    setDomi(true);
    setShowButton(true);
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleConfirmNumber = () => {
    setShowButton(false);
    // Aquí puedes realizar alguna acción con el número de teléfono ingresado
    console.log("Número confirmado:", phoneNumber);
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
      <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${domi ? 'max-h-96' : 'max-h-0'}`}>
        <Input
          placeholder="Ingrese número de teléfono"
          value={phoneNumber}
          onChange={handlePhoneInputChange}
          className="mt-2"
        />
        {showButton && (
          <Button
            onClick={handleConfirmNumber}
            color="success"
            className="mt-2"
          >
            Confirmar número
          </Button>
        )}
      </div>
    </div>
  );
};


