import { useState } from "react";
import Navbar from "./Navbar";

const NavbarContainer = () => {
  const [openMenu, setOpenMenu] = useState(null);
  
  // Usamos exactamente las categorías que creaste en Firebase
  const categories = [
    "Hombres", 
    "Mujeres", 
    "Niños", 
    "Prendas de abrigo", 
    "Ropa interior", 
    "Calzado"
  ];

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
   <Navbar 
      categories={categories} 
      toggleMenu={toggleMenu} 
      openMenu={openMenu} 
    />
  );
}

export default NavbarContainer;