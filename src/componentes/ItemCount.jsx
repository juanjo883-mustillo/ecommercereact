import { useState } from "react";

const ItemCount = ({ stock, initial, onAdd }) => {
  // Estado para manejar el numerito del contador
  const [count, setCount] = useState(initial);

  const sumar = () => {
    // Solo sumamos si no superamos el stock disponible
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const restar = () => {
    // No podemos tener menos de 1 producto
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full mt-4">
      {/* Controles de suma y resta */}
      <div className="flex justify-center items-center gap-6 bg-gray-100 p-2 rounded-lg w-1/2 mx-auto">
        <button 
          onClick={restar} 
          className="btn btn-sm btn-ghost text-2xl text-pink-500 hover:bg-pink-100"
        >
          -
        </button>
        
        <span className="text-xl font-bold">{count}</span>
        
        <button 
          onClick={sumar} 
          className="btn btn-sm btn-ghost text-2xl text-pink-500 hover:bg-pink-100"
        >
          +
        </button>
      </div>

      {/* Botón para confirmar y mandar al carrito */}
      <button 
        onClick={() => onAdd(count)} 
        disabled={stock === 0}
        className="btn bg-pink-500 text-white hover:bg-pink-600 border-none w-full text-lg mt-2"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;