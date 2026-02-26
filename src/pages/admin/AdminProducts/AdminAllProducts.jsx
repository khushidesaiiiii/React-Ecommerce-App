import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MdOutlineAddCircleOutline } from "react-icons/md";
// import { IoIosArrowRoundBack } from "react-icons/io";

import { fetchProducts, sortProducts } from "../../../store/productSlice.js";
import { SORT_OPTIONS } from "../../../utils/sortOptions.js";
import { currencyFormatter } from "../../../utils/currencyFormatter.js";
import Button from "../../../UI/Button.jsx";
import AdminUpdateProduct from "./AdminUpdateProduct.jsx";
import AdminAddProduct from "./AdminAddProduct";
import AdminDeleteProduct from "./AdminDeleteProduct.jsx";
import Filters from "../../../components/Filters/index.jsx";

export default function AdminAllProducts() {
  const dispatch = useDispatch();

  const { list, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const [sortIndex, setSortIndex] = useState(0);
  useEffect(() => {
    const { sortBy, order } = SORT_OPTIONS[sortIndex];
    dispatch(sortProducts({ sortBy, order }));
  }, [dispatch, sortIndex]);

  const [openFilters, setOpenFilters] = useState(false);

  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
    maxPrice: 400000,
    minDiscount: 0,
    rating: 0,
  });

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
  }, [list, filters]);

  //console.log(filteredProducts);

  const handleOpenFilters = () => {
    setOpenFilters(!openFilters);
  };

  if (loading) return <p className="para">Loading....</p>;
  if (error) return <p className="para">{error}</p>;

  return (
    <div className="all-products-page">
      <h2>Product List</h2>
      <div className="admin-user-header-buttons">
        <div className="sort-bar">
          <Button className="add-btn" onClick={() => setAddOpen(true)}>
            <MdOutlineAddCircleOutline /> Add Product
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
                products={list}
                filters={filters}
                setFilters={setFilters}
              />
            )}
          </div>
        </div>
      </div>

      <div className="all-products-grid">
        {filteredProducts.map((p) => (
          <div key={p.id}>
            <div className="all-product-card">
              <div className="all-product-image">
                <img src={p.thumbnail} alt={p.title} />
              </div>  
              <div className="all-product-info">
                <h4>{p.title}</h4>
                <p className="all-price">
                  Price: <strong>{currencyFormatter.format(p.price)}</strong>
                </p>
                <p>Category: {p.category}</p>
              </div>
              <Button
                type="type"
                onClick={() => {
                  // console.log("Clicked");
                  setEditItem(p);
                }}
              >
                Edit
              </Button>
              <Button type="type" onClick={() => setDeleteItem(p)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      {addOpen && <AdminAddProduct onClose={() => setAddOpen(false)} />}
      {editItem && (
        <AdminUpdateProduct
          product={editItem}
          onClose={() => setEditItem(null)}
        />
      )}
      {deleteItem && (
        <AdminDeleteProduct
          product={deleteItem}
          onClose={() => setDeleteItem(null)}
        />
      )}
    </div>
  );
}
