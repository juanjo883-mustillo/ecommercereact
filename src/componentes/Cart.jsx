import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router";

const Cart = () => {
  // Traemos el carrito y las funciones que necesitamos del Contexto
  const { cart, clearCart, removeItem, totalAmount } = useContext(CartContext);

  // Renderizado Condicional: ¿Qué pasa si el carrito está vacío?
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <h2 className="text-3xl font-bold text-gray-700">Tu carrito está vacío</h2>
        <p className="text-gray-500">¡Parece que todavía no agregaste nada!</p>
        <Link to="/" className="btn bg-pink-500 text-white hover:bg-pink-600 border-none mt-4">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  // Si hay productos, renderizamos la lista
  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Resumen de tu compra
      </h2>

      <div className="flex flex-col gap-4">
        {cart.map((producto) => (
          <div
            key={producto.id}
            className="flex items-center justify-between bg-base-100 shadow-sm border border-gray-200 p-4 rounded-lg"
          >
            <img
              src={producto.imagen}
              alt={producto.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1 ml-4">
              <h3 className="font-bold text-lg">{producto.title}</h3>
              <p className="text-sm text-gray-500">
                Precio unitario: ${producto.price}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <span className="font-bold">Cant: {producto.cantidad}</span>
              <span className="font-bold text-pink-500 text-xl">
                ${producto.price * producto.cantidad}
              </span>
              <button
                onClick={() => removeItem(producto.id)}
                className="btn btn-sm btn-error text-white"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4 border-t pt-4">
        <h3 className="text-2xl font-bold">Total a pagar: ${totalAmount()}</h3>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="btn btn-outline border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
          >
            Vaciar Carrito
          </button>
          <Link
            to="/checkout"
            className="btn bg-pink-500 text-white hover:bg-pink-600 border-none"
          >
            Terminar mi compra
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;