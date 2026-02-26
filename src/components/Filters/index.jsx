import Button from "../../UI/Button";

export default function Filters({ products, filters, setFilters }) {
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div className="filters">
      <div className="filter-category">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="price-range-slider">
        <label>
          Price: ${filters.minPrice} - ${filters.maxPrice}
        </label>
        <input
          type="range"
          min="0"
          max="40000"
          step="10"
          onChange={(e) =>
            setFilters({ ...filters, minPrice: Number(e.target.value) })
          }
        />
        <input
          type="range"
          min="0"
          max="40000"
          step="10"
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: Number(e.target.value) })
          }
        />
      </div>
      <div className="filter-discount">
        <select
          value={filters.minDiscount}
          onChange={(e) =>
            setFilters({ ...filters, minDiscount: Number(e.target.value) })
          }
        >
          <option value="0">All Discounts</option>
          <option value="10">10% +</option>
          <option value="20">20% +</option>
          <option value="30">30% +</option>
        </select>
      </div>
      <div className="filter-ratings">
        <select
          value={filters.rating}
          onChange={(e) =>
            setFilters({ ...filters, rating: Number(e.target.value) })
          }
        >
          <option value="0">All Ratings</option>
          <option value="3"> 3 ⭐ and up</option>
          <option value="4">4 ⭐ and up</option>
          <option value="4.5">4.5 ⭐ and up</option>
        </select>
      </div>
      <Button
        onClick={() =>
          setFilters({
            category: "all",
            minPrice: 0,
            maxPrice: 400000,
            minDiscount: 0,
            rating: 0,
          })
        }
      >
        Clear Filters
      </Button>
    </div>
  );
}
