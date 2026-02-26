import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Button from "../../../UI/Button";
import { fetchCategories } from "../../../store/categorySlice";
import { addProduct } from "../../../store/productSlice";

function generateProductImage() {
  return `https://placehold.co/600x400?text=Product+Image+Example`;
}

export default function AdminAddProduct({ onClose }) {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.category);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    thumbnail: generateProductImage(),
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(addProduct(formData)).unwrap();
      toast.success("Product added successfully!");
    } catch (err) {
      toast.error("Failed to add new product");
    }
    onClose();
  }

  return (
    <div className="add-product-modal-backdrop">
      <div className="add-product-modal">
        <h3>Add Product to {formData.category}</h3>
        <form onSubmit={handleSubmit}>
          <div className="user-avtar">
            <img src={formData.thumbnail} alt="User Avtar" />
            </div>
          <input
            type="text"
            placeholder="Enter Product Name"
            name="title"
            required
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
          <input
            type="number"
            placeholder="Enter Product Price"
            name="Price"
            required
            onChange={(e) => {
              setFormData({ ...formData, price: e.target.value });
            }}
          />
          <select
            required
            name="category"
            value={formData.category}
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
          >
            <option value="">Select Category</option>
            {list.map((cat) => {
              return (
                <option key={cat.slug} value={cat.name}>
                  {cat.name}
                </option>
              );
            })}
          </select>
          <Button type="submit">Add</Button>
          <Button type="type" onClick={onClose}>
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
}
  