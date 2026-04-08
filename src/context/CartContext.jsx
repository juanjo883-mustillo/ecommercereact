import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agrega un producto o suma la cantidad si ya existe
  const addItem = (item, cantidad) => {
    if (isInCart(item.id)) {
      setCart(cart.map(prod => 
        // Cambiamos quantity por cantidad
        prod.id === item.id ? { ...prod, cantidad: prod.cantidad + cantidad } : prod
      ));
    } else {
      // Guardamos la propiedad como "cantidad"
      setCart([...cart, { ...item, cantidad }]);
    }
  };

  const isInCart = (itemId) => {
    return cart.some(prod => prod.id === itemId);
  };

  const removeItem = (itemId) => {
    setCart(cart.filter(prod => prod.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calcula el total de unidades para el ícono del Navbar
  const totalQuantity = () => {
    return cart.reduce((acc, prod) => acc + prod.cantidad, 0);
  };

  // Calcula el precio total de la compra
  const totalAmount = () => {
    return cart.reduce((acc, prod) => acc + (prod.price * prod.cantidad), 0);
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, totalQuantity, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};