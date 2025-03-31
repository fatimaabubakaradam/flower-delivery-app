import React, { useState } from "react";
import MobileMenu from "./mobileMenu";
import DesktopMenu from "./desktopMenu";
import Cart from "./cart";

function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div>
      <MobileMenu onCartClick={() => setCartOpen(true)} />
      <DesktopMenu onCartClick={() => setCartOpen(true)} />
      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </div>
  );
}

export default Navbar;
