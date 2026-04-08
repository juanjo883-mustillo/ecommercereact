import { useState, useContext } from "react";
import { Link } from "react-router"; 
import ItemCount from "./ItemCount";
import { CartContext } from "../context/CartContext";

const ItemDetail = ({ product }) => {
  const [cantidadAgregada, setCantidadAgregada] = useState(0);
  const { addItem } = useContext(CartContext);

  const handleAdd = (cantidad) => {
    setCantidadAgregada(cantidad);
    addItem(product, cantidad);
  };

  if (!product) return null;

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl mx-auto mt-10 border border-gray-200">
      
      <figure className="lg:w-1/2">
        <img 
          src={product.imagen} 
          alt={product.name} 
          className="object-cover w-full h-96" 
        />
      </figure>

      <div className="card-body lg:w-1/2 flex flex-col justify-center">
        <h2 className="card-title text-3xl">{product.name}</h2>
        <p className="text-gray-500 text-lg mt-4 flex-grow-0">{product.descripcion}</p>
        <p className="text-3xl font-bold text-pink-500 mt-4">${product.price}</p>
        
        <div className="card-actions justify-end mt-8 w-full">
          {cantidadAgregada > 0 ? (
            <Link to="/cart" className="btn bg-pink-500 text-white hover:bg-pink-600 border-none w-full text-lg">
              Terminar mi compra
            </Link>
          ) : (
            <ItemCount stock={product.stock || 10} initial={1} onAdd={handleAdd} />
          )}
        </div>
      </div>

    </div>
  );
};

export default ItemDetail;