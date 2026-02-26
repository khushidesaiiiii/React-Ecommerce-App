import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Button from "../../../UI/Button";
import {
  fetchUserCarts,
  removeItem,
  updateQuantity,
} from "../../../store/cartSlice";
import { addtoWishlist, toggleWishlist } from "../../../store/wishlistSlice";

export default function Cart({ isOpen, toggle, onCheckout }) {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.carts.items || []);
  // console.log(items);

  const cart = useSelector((state) => state.carts.carts || []);
  // console.log("cart:",cart)

  const totalAmount = (items || []).reduce((sum, item) => sum + item.total, 0);
  const formattedTotal = totalAmount.toFixed(2);

  const showToast = () => {
    toast.success("Moved to wishlist");
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered>
      <ModalHeader toggle={toggle}>Your Cart</ModalHeader>
      <ModalBody>
        {items.length === 0 ? (
          <p style={{ textAlign: "center" }}>Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div className="cart-items" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <div className="cart-item-details">
                <strong>{item.title}</strong>
                <p>{item.price}</p>
                <div className="cart-quantity-controls">
                  <Button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: Math.max(1, item.quantity - 1),
                        }),
                      )
                    }
                  >
                    -{" "}
                  </Button>
                  <span
                    className="cart-qty-value"
                    style={{ fontWeight: "400", padding: "0.15rem 0.4rem" }}
                  >
                    {item?.quantity || 0}
                  </span>
                  <Button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: (+item?.quantity || 0) + 1,
                        }),
                      )
                    }
                  >
                    +
                  </Button>
                </div>
              </div>{" "}
              <div className="cart-item-total">
                <strong>{item.total.toFixed(2)}</strong>
              </div>
                <Button onClick={() => dispatch(removeItem(item.id))}>
                  Delete from Cart
                </Button>
                <Button
                  onClick={() => {
                    dispatch(removeItem(item.id));
                    dispatch(addtoWishlist(item));
                    showToast();
                  }}
                >
                  Move to Wishlist
                </Button>
            </div>
          ))
        )}
      </ModalBody>
      <ModalFooter>
        {items.length === 0 ? "" : <h5>Total: ${formattedTotal}</h5>}
        <div className="cart-btns">
          {items.length === 0 ? (
            ""
          ) : (
            <Button color="primary" onClick={onCheckout}>
              Checkout
            </Button>
          )}{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
