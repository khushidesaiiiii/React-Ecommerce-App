import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";

import Button from "../UI/Button";
import ProductCard from "../components/ProductCard/ProductCard";
import Loader from "../components/Loader";

export default function SearchResult() {
  const { list, loading, error } = useSelector((state) => state.products);
  const navigate = useNavigate();

  if (loading) return <Loader />;
  if (error) return <p className="para">{error}</p>;

  function handleNavigation(){
    navigate('/');
  }

  return (
    <div className="search-results">
      <h2 className="search-title">Search Results</h2>
      <Button type='type' onClick={handleNavigation}><IoIosArrowBack />Home</Button>
      {list.length === 0 ? (
        <p className="para">Sorry! No such Products found.</p>
      ) : (
        <div className="grid">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
