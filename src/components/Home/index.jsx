import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./../../store/productSlice";

import Header from "./components/Header";
import { dealsData } from "../../utils/dealsData";
import Deals from "./components/Deal";
import HomeProuductSection from "./components/HomeProductSection";
import { getBestDiscountProducts, getRandomProducts, getTopRatedProducts } from "./utils/homeProducts";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const list = useSelector((state) => state.products.list);

  return (
    <>
      <Header />
      <section className="deal-seaction">
        <h2>Today's Hot Deals</h2>
        <div className="carousel">
          <div className="carousel-track">
            {[...dealsData, ...dealsData].map((deal, index) => (
              <Deals key={`${deal.category}-${index}`} deal={deal} />
            ))}
          </div>
        </div>
      </section>
      {/* Home Product Section */}
      <HomeProuductSection 
        title="Today's Trending Products"
        products={getRandomProducts(list, 5)}
      />
      <HomeProuductSection 
        title="Our Top Rated Products"
        products={getTopRatedProducts(list, 5)}
      />
      <HomeProuductSection 
        title="Best Discounted Products"
        products={getBestDiscountProducts(list, 5)}
      />
    </>
  );
}

export default Home;
