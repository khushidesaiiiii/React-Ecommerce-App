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
import Loader from "../../../components/Loader/index.jsx";
import ReactPaginate from "react-paginate";

export default function AdminAllProducts() {
  const dispatch = useDispatch();

  const { list, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPage, setJumpToPage] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(12);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortIndex, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  //console.log(filteredProducts);

  const handleOpenFilters = () => {
    setOpenFilters(!openFilters);
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const handleJumpSubmit = (e) => {
    e.preventDefault();
    const pageNum = parseInt(jumpToPage);

    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      setJumpToPage("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.info(
        `Please enter a valid page number between 1 and ${totalPages}`,
      );
    }
  };

  if (loading) return <Loader />;
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
          <div
            className="items-per-page-wrapper"
            style={{
              background: "#c7a27c",
              borderRadius: "8px",
              padding: "2px 2px 2px 5px",
            }}
          >
            <span>Show: </span>
            <select
              style={{ borderColor: "#5a3e2b" }}
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {[12, 24, 48, 96].map((num) => (
                <option key={num} value={num}>
                  {num} items
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="all-products-grid">
        {currentProducts && currentProducts.length > 0 ? (
          currentProducts.map((p) => (
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
          ))
        ) : (
          <p>No matching Products found!</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className=" d-flex justify-content-center mt-5">
          <div className="pagination-container">
            <ReactPaginate
              previousLabel={"«"}
              nextLabel={"»"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              forcePage={currentPage - 1}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
            <div className="jump-to-page">
              <form onSubmit={handleJumpSubmit}>
                <span>Jump to page: </span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  placeholder="Page #"
                  value={jumpToPage}
                  onChange={(e) => setJumpToPage(Number(e.target.value))}
                />
                <Button type="submit">Go</Button>
              </form>
              <small>Total Pages are {totalPages}</small>
            </div>
          </div>
        </div>
      )}
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
