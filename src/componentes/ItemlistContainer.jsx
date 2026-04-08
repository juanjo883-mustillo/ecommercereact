import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { getproducts } from "../firebase/db";

// 1. Ahora el componente recibe la palabra "orden" (ej: "Menor", "Mayor", "Relevante")
function ItemlistContainer({ orden }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    getproducts()
      .then((products) => {
        if (categoryId) {
          const productosFiltrados = products.filter(prod => prod.categoria === categoryId);
          setItems(productosFiltrados);
        } else {
          setItems(products);
        }
      })
      .catch((error) => console.log("Error al cargar productos:", error))
      .finally(() => setLoading(false));
      
  }, [categoryId]);

  if (loading) {
    return <div className="text-center mt-20 text-xl font-bold">Cargando catálogo...</div>;
  }

  // 2. Lógica para ordenar los productos
  // Hacemos una copia de la lista con [...items] y la ordenamos según los precios
  const productosOrdenados = [...items].sort((a, b) => {
    if (orden === "Menor") {
      return a.price - b.price; // Ordena de más barato a más caro
    } else if (orden === "Mayor") {
      return b.price - a.price; // Ordena de más caro a más barato
    }
    return 0; // Si es "Relevante", lo deja como venía de Firebase
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5 mt-5 max-w-7xl mx-auto">
      {/* 3. Ahora usamos "productosOrdenados" en lugar de "items" para dibujar las tarjetas */}
      {productosOrdenados.map((item) => (
        <div key={item.id} className="card bg-base-100 shadow-xl border border-gray-200">
          <figure>
            <img src={item.imagen} alt={item.name} className="h-56 object-cover w-full" />
          </figure>

          <div className="card-body">
            <h2 className="card-title truncate">{item.name}</h2>
            <p className="text-sm text-gray-500 capitalize">{item.categoria}</p>
            <p className="font-bold text-2xl text-pink-500">${item.price}</p>

            <div className="card-actions justify-end mt-4">
              <Link to={`/item/${item.id}`} className="btn bg-pink-500 text-white hover:bg-pink-600 border-none w-full">
                Ver detalle
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemlistContainer;