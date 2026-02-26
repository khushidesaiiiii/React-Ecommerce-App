import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { IoIosArrowRoundBack } from "react-icons/io";
import { BsShop } from "react-icons/bs";

import Button from "../../../UI/Button";
import { categoryImages } from "../../../utils/categoryImages";
import { fetchCategories } from "../../../store/categorySlice";

export default function AdminCategories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <p className="para">Loading...</p>;
  if (error) return <p className="para">{error}</p>;

  function handleNavigation() {
    navigate("/dashboard", {replace:true});
  }

  function handleViewAllProducts() {
    navigate("/admin/products");
  }

  return (
    <div className="admin-category">
      <h2> Select Category </h2>
      <Button onClick={handleViewAllProducts} type='type'><BsShop /> View all Products</Button>
      <div className="category-page">
        {list.map((cat) => {
          return (
            <button
              key={cat.slug}
              onClick={() => navigate(`/admin/category/${cat.slug}`)}
            >
              <img
                src={
                  categoryImages[cat.slug] || "https://via.placeholder.com/200"
                }
                alt={cat.slug}
              />
              <h3>{cat.name}</h3>
            </button>
          );
        })}
      </div>
    </div>
  );
}
