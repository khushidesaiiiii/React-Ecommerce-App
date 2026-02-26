import { Link, useNavigate } from "react-router-dom";

import { currencyFormatter } from "../../utils/currencyFormatter";
import Button from "../../UI/Button";
import AddToCartButton from "../../UI/AddToCartButton";

export default function QuickView({ product, onClose, userId }) {
  const navigate = useNavigate();

  function handleViewDetails(){
    onClose();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="quickview-overlay" onClick={onClose} >
      <div className="quickview-modal" onClick={(e)=>{ e.stopPropagation()}}>
        <button className="close-button" onClick={onClose}>
          x
        </button>
        <div className="quickview-content">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-image"
          />
          <div className="quickview-info">
            <h4>{product.title}</h4>
            <p>Category: {product.category}</p>
            <p >{currencyFormatter.format(product.price)}</p>
            {/* <p>{product.id}</p> */}
            <Button type="type"
            onClick={handleViewDetails} >
                View more details
            </Button>

            <AddToCartButton product={product} userId={userId} />
            
          </div>
        </div>
      </div>
    </div>
  );
}
