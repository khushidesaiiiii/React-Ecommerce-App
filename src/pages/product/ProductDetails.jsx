import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import Button from "../../UI/Button";
import {
  clearProductDetails,
  fetchProductDetails,
} from "../../store/productSlice";
import { currencyFormatter } from "../../utils/currencyFormatter";
import AddToCartButton from "../../UI/AddToCartButton";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productDetails, loading, error } = useSelector(
    (state) => state.products,
  );
  const authUser = useSelector((state) => state.auth?.user);
  const authUserId = authUser?.id;
  // console.log(authUserId);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
    return () => {
      dispatch(clearProductDetails());
    };
  }, [dispatch, id]);

  const [activeImage, setActiveImage] = useState();
  const [activeTab, setActiveTab] = useState("description");
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    if (productDetails?.images?.length) {
      setActiveImage(productDetails.images[0]);
    }
  }, [productDetails]);

  const reviews = productDetails?.reviews || [];
  const hasMultipleReviews = reviews.length > 1;

  const prevReview = () => {
    if (!hasMultipleReviews) return;
    setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };
  const nextReview = () => {
    if (!hasMultipleReviews) return;
    setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  function handleNavigation() {
    navigate(`/category/${productDetails.category}`);
  }

  if (loading) return <p className="para">Loading...</p>;
  if (error) return <p className="para">{error}</p>;
  if (!productDetails) return <p className="para">Loading......</p>;

  
  return (
    <>
      <div style={{ marginTop: "2.5rem", marginLeft: "4rem" }}>
        <div className="outer-product-details">
          <Button
            type="type"
            onClick={handleNavigation}
            className="outer-button"
          >
            <IoIosArrowBack />
            Back to Products
          </Button>
        </div>
      </div>
      <div className="product-details">
        <div className="product-image">
          <img
            src={activeImage}
            alt={productDetails.title}
            className="main-image"
          />
          <div className="image-thumbnail">
            {productDetails.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="product"
                className={activeImage === img ? "active" : ""}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h2>{productDetails.title}</h2>

          <p className="category">Category: {productDetails.category}</p>

          <p className="brand">Brand: {productDetails.brand ?? "Branded"}</p>

          <p className="price">
            {currencyFormatter.format(productDetails.price)}
          </p>

          <p className="rating">Ratings: {productDetails.rating} ⭐</p>

          <AddToCartButton
            product={productDetails}
            userId={authUserId}
          />
          
        </div>
        <div className="tabs">
          <div className="tab-buttons">
            <button
              className={activeTab === "description" ? "active" : ""}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={activeTab === "details" ? "active" : ""}
              onClick={() => setActiveTab("details")}
            >
              Product Details
            </button>
            <button
              className={activeTab === "shipping" ? "active" : ""}
              onClick={() => setActiveTab("shipping")}
            >
              Shipping Policy
            </button>

            <button
              className={activeTab === "return" ? "active" : ""}
              onClick={() => setActiveTab("return")}
            >
              Returns
            </button>
          </div>
        </div>
        <div className="tab-content">
          {activeTab === "description" && <p>{productDetails.description}</p>}
          {activeTab === "details" && (
            <>
              <p>The dimensions of the product are:</p>
              <div className="dimensions">
                <p>Width : {productDetails.dimensions.width}</p>
                <p>height : {productDetails.dimensions.height}</p>
                <p>depth : {productDetails.dimensions.depth}</p>
              </div>
            </>
          )}
          {activeTab === "shipping" && (
            <p>
              {productDetails.shippingInformation ??
                "The product will be shipped within 5 working days."}
            </p>
          )}
          {activeTab === "return" && (
            <p>
              {productDetails.returnPolicy ??
                "This product has 30 days return policy."}
            </p>
          )}
        </div>
        <div className="reviews">
          {reviews.length > 0 && (
            <div className="review-section">
              <h3>Customer Reviews</h3>
              <div className="review-card">
                <Button
                  className="arrow"
                  onClick={prevReview}
                  disabled={!hasMultipleReviews}
                >
                  <IoIosArrowBack />
                </Button>
                <div className="review-content">
                  {reviews[currentReview] ? (
                    <>
                      <h4>{reviews[currentReview]?.reviewerName}</h4>
                      <p className="review-rating">
                        Rating: {reviews[currentReview]?.rating}
                      </p>
                      <p className="review-comment">
                        {reviews[currentReview]?.comment}
                      </p>
                      <small className="review-date">
                        {new Date(reviews[currentReview]?.date).toDateString()}
                      </small>
                    </>
                  ) : (
                    <p>No review available.</p>
                  )}
                </div>
                <Button
                  className="arrow"
                  onClick={nextReview}
                  disabled={!hasMultipleReviews}
                >
                  <IoIosArrowForward />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
