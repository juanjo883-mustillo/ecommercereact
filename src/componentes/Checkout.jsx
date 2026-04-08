import { useState, useContext } from "react";
import { Link } from "react-router";
// Importamos las funciones para agregar documentos a Firebase
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/db";
// IMPORTANTE: Asegurate de que esta ruta a tu CartContext sea la correcta
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  // Traemos lo que necesitamos del carrito (asegurate de usar los nombres que pusiste en tu context)
  const { cart, clearCart } = useContext(CartContext);
  
  // Estados para el formulario y la orden
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [comprador, setComprador] = useState({
    nombre: "",
    telefono: "",
    email: "",
    emailConfirmacion: ""
  });

   // Usamos .cantidad en lugar de .quantity y .price que ya tenías
        const total = cart.reduce((acc, item) => acc + item.price * item.cantidad, 0);
  

  // Función para guardar lo que el usuario escribe en los inputs
  const manejarInputs = (e) => {
    setComprador({
      ...comprador,
      [e.target.name]: e.target.value
    });
  };

  // Función que se ejecuta al hacer clic en "Comprar"
  const finalizarCompra = (e) => {
    e.preventDefault(); // Evitamos que la página se recargue

    // Validación básica: los emails deben coincidir
    if (comprador.email !== comprador.emailConfirmacion) {
      alert("Los emails no coinciden. Por favor, revisalos.");
      return;
    }

    setLoading(true);

    // 1. Armamos el objeto de la orden tal como lo pide Coderhouse
    const orden = {
      buyer: {
        nombre: comprador.nombre,
        telefono: comprador.telefono,
        email: comprador.email
      },
      items: cart,
      total: total,
      fecha: new Date() // Guarda la fecha y hora exacta de la compra
    };

    // 2. Apuntamos a la colección "orders" (si no existe, Firebase la crea sola)
    const ordersRef = collection(db, "orders");

    // 3. Enviamos la orden a Firebase
    addDoc(ordersRef, orden)
      .then((resp) => {
        setOrderId(resp.id); // Guardamos el ID que nos devuelve Firebase
        clearCart(); // Vaciamos el carrito porque la compra ya se hizo
      })
      .catch((error) => console.log("Error al crear la orden:", error))
      .finally(() => setLoading(false));
  };

  // Renderizado Condicional 1: Si la compra fue exitosa, mostramos el ticket
  if (orderId) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <h2 className="text-4xl font-bold text-pink-500 mb-4">¡Gracias por tu compra!</h2>
        <p className="text-xl mb-4">Tu pedido ha sido procesado con éxito.</p>
        <div className="bg-gray-100 p-6 rounded-lg inline-block">
          <p className="text-gray-600">Tu número de seguimiento es:</p>
          <p className="font-bold text-2xl mt-2">{orderId}</p>
        </div>
        <div className="mt-8">
          <Link to="/" className="btn bg-pink-500 text-white hover:bg-pink-600 border-none">
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  // Renderizado Condicional 2: Si el carrito está vacío y no hay orden, lo mandamos a comprar
  if (cart.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold">No tienes productos en el carrito</h2>
        <Link to="/" className="btn bg-pink-500 text-white hover:bg-pink-600 border-none mt-5">
          Ir al catálogo
        </Link>
      </div>
    );
  }

  // Renderizado Normal: El formulario de pago
  return (
    <div className="container mx-auto mt-10 px-4 max-w-2xl">
      <h2 className="text-3xl font-bold text-center mb-8">Finalizar Compra</h2>
      
      <form onSubmit={finalizarCompra} className="bg-base-100 shadow-xl rounded-xl p-8 border border-gray-200">
        <div className="form-control mb-4">
          <label className="label"><span className="label-text font-bold">Nombre Completo</span></label>
          <input type="text" name="nombre" value={comprador.nombre} onChange={manejarInputs} required className="input input-bordered w-full" placeholder="Ej: Juan Pérez" />
        </div>

        <div className="form-control mb-4">
          <label className="label"><span className="label-text font-bold">Teléfono</span></label>
          <input type="number" name="telefono" value={comprador.telefono} onChange={manejarInputs} required className="input input-bordered w-full" placeholder="Ej: 1122334455" />
        </div>

        <div className="form-control mb-4">
          <label className="label"><span className="label-text font-bold">Email</span></label>
          <input type="email" name="email" value={comprador.email} onChange={manejarInputs} required className="input input-bordered w-full" placeholder="Ej: juan@mail.com" />
        </div>

        <div className="form-control mb-8">
          <label className="label"><span className="label-text font-bold">Confirmar Email</span></label>
          <input type="email" name="emailConfirmacion" value={comprador.emailConfirmacion} onChange={manejarInputs} required className="input input-bordered w-full" placeholder="Repetir email" />
        </div>

        <button type="submit" disabled={loading} className="btn bg-pink-500 text-white hover:bg-pink-600 border-none w-full text-lg">
          {loading ? "Procesando..." : `Confirmar Compra ($${total})`}
        </button>
      </form>
    </div>
  );
};

export default Checkout;