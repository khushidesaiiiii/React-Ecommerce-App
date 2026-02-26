import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { IoIosArrowRoundBack } from "react-icons/io";

import {
  clearCategoryProducts,
  fetchProductsByCategory,
} from "../../../store/categorySlice";
import Button from "../../../UI/Button";
import AdminAddProduct from "../AdminProducts/AdminAddProduct";
import AdminUpdateProduct from "../AdminProducts/AdminUpdateProduct";
import AdminDeleteProduct from "../AdminProducts/AdminDeleteProduct";

export default function AdminCategoryProducts() {
  const { category } = useParams();
  //console.log(category)
  const navigate = useNavigate();

  const { products, error, loading } = useSelector((state) => state.category);
  //console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    if (category) {
      // console.log("found");
      dispatch(fetchProductsByCategory({categoryName: category}));
      return () => {
        clearCategoryProducts();
      };
    }
  }, [dispatch, category]);

  const [addOpen, setAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  if (loading) return <p className="para">Loading...</p>;
  if(error) return <p className="para">{error.message}</p>

  function handleNavigation() {
    navigate("/admin/category", { replace: true });
  }

  return (
    <div className="admin-category-page">
      <div className="admin-category-header">
        <h2> {category}</h2>
        <Button  onClick={handleNavigation} type="type">
          <IoIosArrowRoundBack /> Back
        </Button>
        {/* <Button onClick={() => setAddOpen(true)}>
          <MdOutlineAddCircleOutline /> Add Product
        </Button> */}
      </div>
      {/* {error ? <p>{error.message}</p> : <p>No Error</p>} */}
      <div className="admin-product-grid">
        {products.map((p) => (
          <div className="admin-product-card" key={p.title}>
            <img
              src={p.thumbnail}
              alt={p.title}
              className="admin-product-image"
            />

            <div className="admin-product-info">
              <h4>{p.title}</h4>
              <p className="price">${p.price}</p>
            </div>
            <div className="admin-product-actions">
              <button className="edit-btn" onClick={() => setEditProduct(p)}>
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => setDeleteProduct(p)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {addOpen && (
        <AdminAddProduct
          category={category}
          onClose={() => setAddOpen(false)}
        />
      )}
      {editProduct && (
        <AdminUpdateProduct
          product={editProduct}
          onClose={() => setEditProduct(null)}
        />
      )}
      {deleteProduct && (
        <AdminDeleteProduct
          product={deleteProduct}
          onClose={() => setDeleteProduct(null)}
        />
      )}
    </div>
  );
}
