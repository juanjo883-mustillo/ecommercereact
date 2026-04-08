import { useState } from "react"; // 1. Importamos useState
import { Link } from "react-router"; 
import ItemlistContainer from "../ItemlistContainer";

const Listadeproductos = () => {
  // 2. Creamos el estado para el ordenamiento (por defecto "Relevante")
  const [orden, setOrden] = useState("Relevante");

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Sidebar */}
        <aside className="bg-white p-6 rounded-2xl shadow-md md:col-span-1">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
            Filtros
          </h2>

          <div className="mb-6">
            <Link to="/" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 underline">
              Ver todos los productos
            </Link>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-indigo-600 mb-3">Categorías</h3>
            <div className="space-y-3 flex flex-col">
              <Link to="/category/Hombres" className="text-gray-700 hover:text-indigo-600 hover:font-bold transition-all">Hombres</Link>
              <Link to="/category/Mujeres" className="text-gray-700 hover:text-indigo-600 hover:font-bold transition-all">Mujeres</Link>
              <Link to="/category/Niños" className="text-gray-700 hover:text-indigo-600 hover:font-bold transition-all">Niños</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-indigo-600 mb-3">Tipos de productos</h3>
            <div className="space-y-3 flex flex-col">
              <Link to="/category/Prendas de abrigo" className="text-gray-700 hover:text-indigo-600 hover:font-bold transition-all">Prendas de abrigo</Link>
              <Link to="/category/Ropa interior" className="text-gray-700 hover:text-indigo-600 hover:font-bold transition-all">Ropa interior</Link>
              <Link to="/category/Calzado" className="text-gray-700 hover:text-indigo-600 hover:font-bold transition-all">Calzado</Link>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="md:col-span-3">
          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Todas las colecciones
            </h2>

            <div>
              <label className="text-gray-700 font-medium mr-2">
                Ordenar por
              </label>
              {/* 3. Conectamos el select al estado */}
              <select 
                value={orden} 
                onChange={(e) => setOrden(e.target.value)}
                className="ml-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Relevante">Relevante</option>
                <option value="Menor">Precio: menor a mayor</option>
                <option value="Mayor">Precio: mayor a menor</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            {/* 4. Le pasamos la palabra elegida al componente de los productos */}
            <ItemlistContainer orden={orden} />
          </div>
        </main>
      </div>
    </section>
  );
};

export default Listadeproductos;