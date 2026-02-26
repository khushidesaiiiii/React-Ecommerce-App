import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProductCard from "../../components/ProductCard/ProductCard";
import Button from "../../UI/Button";

export default function WishlistPage() {
  const items = useSelector((state) => state.wishlist.items);
  const navigate = useNavigate();

  const handleNavigation = () => navigate("/all-products");

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>

      {items.length === 0 && (
        <div>
          <p className="para">No items in your wishlist. </p>
          <span>Start shopping today!!</span>
          <hr/>
          <Button onClick={handleNavigation}>Browse Products</Button>
        </div>
      )}

      <div className="grid">
        {items.map((item) => (
          <div key={item.id}>
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
