import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { MdOutlineAddCircleOutline } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

import Button from "../../UI/Button.jsx";
import { fetchProducts, sortProducts } from "../../store/productSlice.js";
import { SORT_OPTIONS } from "../../utils/sortOptions.js";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import Filters from "../../components/Filters/index.jsx";

export default function AllProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list = [], loading, error } = useSelector((state) => state.products);
  // console.log(list)
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [sortIndex, setSortIndex] = useState(0);
  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
    const { sortBy, order } = SORT_OPTIONS[sortIndex];
    dispatch(sortProducts({ sortBy, order }));
  }, [dispatch, sortIndex]);

  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
    maxPrice: 400000,
    minDiscount: 0,
    rating: 0,
  });

  // useEffect(() => {
  //   setFilteredProducts(list);
  // }, []);

  const filteredProducts = useMemo(() => {
    let result = [...list];

    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice,
    );

    result = result.filter((p) => p.discountPercentage >= filters.minDiscount);

    result = result.filter((p) => p.rating >= filters.rating);

    return result;
  }, [filters, list]);

  if (loading) return <p className="para">Loading....</p>;
  if (error) return <p className="para">{error}</p>;

  function handleNavigation() {
    navigate("/category", { replace: true });
  }

  function handleOpenFilters() {
    setOpenFilters(!openFilters);
  }

  return (
    <div className="all-products-page">
      <h2>Product List</h2>
      <div className="admin-user-header-buttons ">
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
          </select>{" "}
          <div className="filters-open">
            <Button onClick={handleOpenFilters}>
              {openFilters ? "Close Filters" : "View Filters"}
            </Button>
            {openFilters && (
              <Filters
                products={list}
                filters={filters}
                setFilters={setFilters}
              />
            )}
          </div>
        </div>
      </div>

      <div className="grid">
        {/* {list.map((product) => {
          return (
            <Fragment key={product.id}>
              <ProductCard product={product} />
            </Fragment>
          );
        })} */}
        {filteredProducts.length === 0 ? (
          <p>No Products Found</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
