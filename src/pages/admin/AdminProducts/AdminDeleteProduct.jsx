import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { deleteProduct } from "../../../store/productSlice";
import Button from "../../../UI/Button";

export default function AdminDeleteProduct({ product, onClose }) {
  const dispatch = useDispatch();

  async function handleDelete() {
    try {
      await dispatch(deleteProduct(product.id)).unwrap();
      toast.success("Product Deleted!");
    } catch (err) {
      toast.error("Failed to Delete Product");
    }
    onClose();
  }

  return (
    <div className="del-product-modal-backdrop">
      <div className="del-product-modal">
        <h3>Delete Product</h3>
        <p>
          Are you sure you want to delete <strong>{product.title}</strong>? Once
          deleted, this action cannot be undone.{" "}
        </p>
        <Button type="type" onClick={handleDelete}>
          Delete
        </Button>
        <Button type="type" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
