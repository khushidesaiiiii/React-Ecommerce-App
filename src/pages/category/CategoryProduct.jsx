import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";

import Button from "../../UI/Button";
import {
  clearCategoryProducts,
  fetchProductsByCategory,
} from "../../store/categorySlice";
import { SORT_OPTIONS } from "../../utils/sortOptions";
import ProductCard from "../../components/ProductCard/ProductCard";
import Filters from "../../components/Filters";

export default function CategoryProduct() {
  const dispatch = useDispatch();
  const { categoryName } = useParams();
  //   console.log(categoryName);
  const { products, error, loading } = useSelector((state) => state.category);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryName) {
      dispatch(fetchProductsByCategory(categoryName));
      return () => {
        clearCategoryProducts();
      };
    }
  }, [dispatch, categoryName]);

  function handleNavigation() {
    navigate("/category");
  }

  const [sortIndex, setSortIndex] = useState(0);

  useEffect(() => {
    const { sortBy, order } = SORT_OPTIONS[sortIndex];
    dispatch(fetchProductsByCategory({ categoryName, sortBy, order }));
  }, [dispatch, sortIndex]);

  const [openFilters, setOpenFilters] = useState(false);

  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
    maxPrice: 200000,
    minDiscount: 0,
    rating: 0,
  });

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice,
    );

    result = result.filter((p) => p.discountPercentage >= filters.minDiscount);

    result = result.filter((p) => p.rating >= filters.rating);

    return result;
  }, [filters, products]);

  function handleOpenFilters() {
    setOpenFilters(!openFilters);
  }

  if (loading) return <p className="para">Loading...</p>;
  if (error) return <p className="para">{error}</p>;

  return (
    <>
      <div className="category-title">
        <h2>{categoryName}</h2>
        <div className="admin-user-header-buttons">
          <div className="sort-bar">
            <Button type="type" onClick={handleNavigation}>
              <IoIosArrowBack />
              Back to Categories
            </Button>

            <select
              value={sortIndex}
              onChange={(e) => setSortIndex(Number(e.target.value))}
            >
              {SORT_OPTIONS.map((option, index) => (
                <option key={option.label} value={index}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="filters-open">
              <Button onClick={handleOpenFilters}>
                {openFilters ? "Close Filters" : "View Filters"}
              </Button>
              {openFilters && (
                <Filters
                  products={products}
                  filters={filters}
                  setFilters={setFilters}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid">
        {/* {products.map((product) => {
          return (
            <Fragment key={product.id}>
              <ProductCard product={product} />
            </Fragment>
          );
        })} */}
        {filteredProducts.length === 0 ? (
          <p className="para">No Products Found</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </>
  );
}
