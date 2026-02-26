import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../UI/Button";
import WishlistButton from "../../UI/WishlistButton";
import QuickView from "../Quickview/QuickView";
import AddToCartButton from "../../UI/AddToCartButton";
import { currencyFormatter } from "../../utils/currencyFormatter";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  function handleCloseModal() {
    setShowModal(false);
  }

  const authUser = useSelector((state) => state.auth?.user);
  const authUserId = authUser?.id;

  // console.log(authUserId)

  // const items = useSelector((state) => state.wishlist.items);

  // const handleAddToCart = (product) => {
  //   const exits = items.find(
  //     (p) => p.id === product.id
  //   );

  //   if(exits){
  //     dispatch(removefromWishlist());
  //   }
    
  //   return;
  // };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="product-card-grid">
      <div className="product-card-card">
        <div className="image-wrapper">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-card-image"
            />
          </Link>
        </div>
        <div className="product-card-info">
          <WishlistButton product={product} />
          <h4>{product.title}</h4>
          <p>{product.category}</p>
          <p>{currencyFormatter.format(product.price)}</p>
          <p>{product.rating} ⭐</p>
        </div>
        <div className="product-card-actions">
          <AddToCartButton
            product={product}
            userId={authUserId}
          />
          <Button type="type" onClick={handleOpenModal}>
            View Product
          </Button>
        </div>
      </div>
      {showModal && (
        <QuickView
          product={product}
          onClose={handleCloseModal}
          userId={authUserId}
        />
      )}
    </div>
  );
}
