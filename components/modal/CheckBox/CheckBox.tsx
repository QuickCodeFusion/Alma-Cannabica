import React, { useState } from "react";
import { Checkbox, Input, Button } from "@nextui-org/react";
import { time } from "console";

export const CheckBox = ({handleActive, active}:{handleActive: () => void, active: boolean }) => {
  const [tienda, setTienda] = useState(false);
  const [domi, setDomi] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleTiendaChange = () => {
    setTienda(true);
    setDomi(false);
    setShowButton(false);
    if(!tienda && active) handleActive();
  };

  const handleDomiChange = () => {
    setTienda(false);
    setDomi(true);
    setShowButton(true);
    if(!domi && !active)handleActive();
  };

 

  const handleConfirmNumber = () => {
    setShowButton(false);
    if(!tienda )handleActive();
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
        <p className="text-red-600">Para Gestionar tu pedido a Domicilio, por favor contactanos a travez del whatsapp +54 9 11 2793-8262, el valor del Domicilio es aparte de valor pagado por el producto. haz click en Confirmar para continuar </p>
        {showButton && (
          <Button
            onClick={handleConfirmNumber}
            color="success"
            className="mt-2 text-white"
          >
            Confirmar
          </Button>
        )}
      </div>
    </div>
  );
};


