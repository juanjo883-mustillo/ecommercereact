// Archivo: src/componentes/ItemDetailContainer.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ItemDetail from "./ItemDetail"; 
// 1. Importamos las herramientas de Firebase para buscar un solo documento
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/db"; 

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 2. Extraemos el ID de la URL
  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);
    
    // 3. Creamos una referencia al documento específico en la colección "products"
    const docRef = doc(db, "products", itemId);

    // 4. Vamos a buscar ese documento a Firebase
    getDoc(docRef)
      .then((resp) => {
        // Verificamos si el producto existe
        if (resp.exists()) {
          // Guardamos los datos reales en el estado
          setProduct({ id: resp.id, ...resp.data() });
        } else {
          console.log("No se encontró el producto en Firebase");
        }
      })
      .catch((error) => {
        console.log("Error al obtener el producto:", error);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [itemId]); 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-pink-500"></span>
      </div>
    );
  }

  // Si no hay producto porque el ID no existe en Firebase
  if (!product) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-600">El producto no existe.</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <ItemDetail product={product} />
    </div>
  );
};

export default ItemDetailContainer;