import { useContext } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { totalQuantity } = useContext(CartContext);

  // Mudamos las categorías directamente acá adentro para que no fallen nunca
  const categories = [
    "Hombres", 
    "Mujeres", 
    "Niños", 
    "Prendas de abrigo", 
    "Ropa interior", 
    "Calzado"
  ];

  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo - Al hacer click vuelve al inicio */}
        <Link to="/">
          <h1 className="text-2xl font-bold text-gray-800">
            TR <span className="text-pink-500">LUNASOLCREACIONES</span>
          </h1>
        </Link>

        {/* Menú de categorías dinámico (¡Sin el Cargando!) */}
        <nav className="hidden md:flex gap-4">
          {categories.map((cat) => (
            <NavLink 
              key={cat} 
              to={`/category/${cat}`}
              className={({ isActive }) => 
                isActive ? "text-pink-500 font-bold capitalize" : "text-gray-700 capitalize hover:text-pink-500"
              }
            >
              {cat}
            </NavLink>
          ))}
        </nav>

        {/* Iconos y Carrito */}
        <div className="flex items-center gap-6">
          <button className="text-gray-700 hover:text-pink-500 transition text-xl">
            <FaSearch />
          </button>

          <Link to="/cart" className="relative text-gray-700 hover:text-pink-500 transition text-xl">
            <FaShoppingCart />
            {/* Burbuja del carrito condicional */}
            {totalQuantity() > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity()}
              </span>
            )}
          </Link>
        </div>
        
      </div>
    </header>
  );
}

export default Navbar;