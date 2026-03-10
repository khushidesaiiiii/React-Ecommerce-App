import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

import { IoIosArrowBack } from "react-icons/io";

import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import Filters from "../../components/Filters/index.jsx";
import Button from "../../UI/Button.jsx";
import { fetchProducts, sortProducts } from "../../store/productSlice.js";
import { SORT_OPTIONS } from "../../utils/sortOptions.js";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/index.jsx";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [jumpToPage, setJumpToPage] = useState("");

  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
    maxPrice: 400000,
    minDiscount: 0,
    rating: 0,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortIndex]);

  useEffect(() => {
    const { sortBy, order } = SORT_OPTIONS[sortIndex];
    dispatch(sortProducts({ sortBy, order }));
  }, [dispatch, sortIndex]);

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

  const indeOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indeOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indeOfLastProduct,
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPaginationRange = () => {
    const totalNumbers = 5;
    const siblingCount = 1;

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowleftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    //only right dots
    if (!shouldShowleftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "DOTS", totalPages];
    }

    //only left dots
    if (shouldShowleftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1,
      );
      return [1, "DOTS", ...rightRange];
    }

    //show both the dots
    if (shouldShowRightDots && shouldShowleftDots) {
      let middleRange = Array.from(
        {
          length: rightSiblingIndex - leftSiblingIndex + 1,
        },
        (_, i) => leftSiblingIndex + i,
      );
      return [1, "DOTS", ...middleRange, "DOTS", totalPages];
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="para">{error}</p>;

  function handleNavigation() {
    navigate("/category", { replace: true });
  }

  function handleOpenFilters() {
    setOpenFilters(!openFilters);
  }

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
          </div>{" "}
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

      <div className="grid">
        {currentProducts.length === 0 ? (
          <p>No Products Found</p>
        ) : (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
      {totalPages > 1 && (
        <div className=" d-flex justify-content-center mt-5">
          <div className="pagination-container">
            <Pagination aria-label="Page navigation">
              <PaginationItem disabled={currentPage <= 1}>
                <PaginationLink
                  previous
                  onClick={(e) => handlePageClick(e, currentPage - 1)}
                />
              </PaginationItem>

              {/* For all Page Numbers */}
              {/* {[...Array(totalPages)].map((_, i) => (
              <PaginationItem active={i + 1 === currentPage} key={i}>
                <PaginationLink onClick={(e) => handlePageClick(e, i + 1)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))} */}

              {getPaginationRange().map((pageNumber, index) => {
                if (pageNumber === "DOTS") {
                  return (
                    <PaginationItem key={`dots-${index}`} disabled>
                      <PaginationLink>...</PaginationLink>
                    </PaginationItem>
                  );
                }
                return (
                  <PaginationItem
                    active={pageNumber === currentPage}
                    key={pageNumber}
                  >
                    <PaginationLink
                      onClick={(e) => handlePageClick(e, pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem disabled={currentPage >= totalPages}>
                <PaginationLink
                  next
                  onClick={(e) => handlePageClick(e, currentPage + 1)}
                />
              </PaginationItem>
            </Pagination>
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
    </div>
  );
}
