import { BrowserRouter, Routes, Route } from "react-router";
import NavbarContainer from "./componentes/Navbar"; 
import ItemlistContainer from "./componentes/listadeproductos/listadeproductos";
import ItemDetailContainer from "./componentes/ItemDetailContainer";
// 1. Importamos el Provider
import { CartProvider } from "./context/CartContext"; 
import Cart from "./componentes/Cart";
import Checkout from "./componentes/Checkout";

function App() {
  return (
    <BrowserRouter>
      {/* 2. Envolvemos toda la aplicación */}
      <CartProvider>
        <NavbarContainer />
        <Routes>
          <Route path="/" element={<ItemlistContainer />} />
          <Route path="/category/:categoryId" element={<ItemlistContainer />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

