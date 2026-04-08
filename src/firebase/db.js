import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./config";

// Le agregamos el export por si necesitamos usar la db en otro lado
export const db = getFirestore(app);

export const getproducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  const products = [];
    
  querySnapshot.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });

  // ¡El return va ACÁ ADENTRO, justo antes de cerrar la llave final!
  return products;
};
