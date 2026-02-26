import { useSelector } from "react-redux";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

import Cart from "./componets/Cart";
import Checkout from "./componets/Checkout";

export default function CartController() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutPageOpen, setCheckoutPageOpen] = useState(false);
  // const [orderSuccessOpen, setOrderSucsessOpen] = useState(false);

  const toggleCart = () => setCartOpen(!cartOpen);

  const cartItems = useSelector((state) => state.carts.items);
  const cartCount = cartItems?.length;

  return (
    <>
      <div className="nav-cart-btn">
        <button onClick={toggleCart}>
          <div className="cart-count">{cartCount}</div>
          <FaShoppingCart />
        </button>
      </div>
      {cartOpen && (
        <Cart
          isOpen={cartOpen}
          toggle={toggleCart}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutPageOpen(true);
          }}
        />
      )}

      {checkoutPageOpen && (
        <Checkout
          isOpen={checkoutPageOpen}
          onSucess={() => {
            setCheckoutPageOpen(false);
            
          }}
          toggle={() => setCheckoutPageOpen(false)}
        />
      )}
      
    </>
  );
}
