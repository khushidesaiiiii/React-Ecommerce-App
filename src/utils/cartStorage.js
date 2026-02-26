import { useDispatch } from "react-redux";
import { updateQuantity } from "../store/cartSlice";
import { useEffect } from "react";

export const loadItems = (userId) => {
  try {
    const data = localStorage.getItem(`cartItems_${userId}`);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveUserCart = (userId, items) => {
  if (!userId) return;
  localStorage.setItem(`cartItems_${userId}`, JSON.stringify(items));
};

export const clearUserCart = (userId) => {
  if (!userId) return;
  localStorage.removeItem(`cartItems_${userId}`);
};

export const increaseProductQuantity = () => {};

export const decreaseProductQuantity = (item) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: Math.max(1, item.quantity - 1),
      }),
    );
  }, [dispatch, item]);
};
