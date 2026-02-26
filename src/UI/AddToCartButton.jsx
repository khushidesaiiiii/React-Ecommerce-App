import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "./Button";
import { addToCartAPI } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";

export default function AddToCartButton({ product, userId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(userId)

  const items = useSelector((state) => state.wishlist.items);

  const handleAddToCart = async (product) => {
    // console.log("CLickeddd")
    try {
      if (!userId) {
        navigate("/login");
        toast.info("Please login to add to cart!", { position: "top-right" });
        return;
      }

      const exits = items.find((p) => p.id === product.id);

      if (exits) {
         dispatch(toggleWishlist(product));
      }

      await dispatch(addToCartAPI({ userId, product })).unwrap();
      toast.success("Product added to cart!");
    } catch (err) {
      {
        toast.error(err || "Failed to add product");
      }
    }
  };

  return (
    <>
      <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
    </>
  );
}
