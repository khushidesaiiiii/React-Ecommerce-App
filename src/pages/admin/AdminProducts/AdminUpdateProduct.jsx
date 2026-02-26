import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Button from "../../../UI/Button";
import { updateProduct } from "../../../store/productSlice";

export default function AdminUpdateProduct({ product, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
  });

  function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(
        updateProduct({
          id: product.id,
          updates: formData,
        })
      ).unwrap();
      toast.success("Product details updated!");
    } catch (err) {
      toast.error("Failed to update product details");
    }
    onClose();
  }

  return (
    <div className="update-product-modal-modal-backdrop">
      <div className="update-product-modal-modal">
        <h3>Update Product Details</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
          <input
            type="number"
            name="title"
            required
            value={formData.price}
            onChange={(e) => {
              setFormData({ ...formData, price: e.target.value });
            }}
          />

          <Button type="submit">Update</Button>
          <Button type="type" onClick={onClose}>
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
}
