import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { IoIosArrowBack} from "react-icons/io";
import { BsShop } from "react-icons/bs";

import Button from "../../UI/Button";
import { fetchCategories } from "../../store/categorySlice";
import { categoryImages } from "../../utils/categoryImages";
// import Card from "../UI/Card";

export default function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, error, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  function handleNavigation() {
    navigate("/");
  }

  function handleViewAllProducts() {
    navigate("/all-products");
  }
  
  if (loading) {
    return <p className="para"> Loading categories...</p>;
  }
  if (error) {
    return <p className="para">{error}</p>;
  }

  return (
    <div className="categories">
      <h2>Product Categories</h2>
      <Button type="type" onClick={handleNavigation}>
        <IoIosArrowBack />
        Home
      </Button>
      <Button onClick={handleViewAllProducts} type="type">
        <BsShop /> View all Products
      </Button>

      <div className="category-grid">
        {list.length > 0
          ? list.map((category) => {
              return (
                // <Card
                // image={categoryImages[category.slug]}
                // title={category.name}
                // key={category.slug}
                // >
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="category-card"
                >
                  <img
                    src={
                      categoryImages[category.slug] ||
                      "https://via.placeholder.com/200"
                    }
                    alt={category.name}
                  />

                  <h3>{category.name}</h3>
                </Link>
                // </Card>
              );
            })
          : "failed"}
      </div>
    </div>
  );
}
