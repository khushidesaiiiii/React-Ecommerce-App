import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../UI/Button";

import header1 from "../../../assets/images/header/Header1.jpg";
import header2 from "../../../assets/images/header/Header2.jpg";
import header3 from "../../../assets/images/header/Header3.jpg";

const images = [header1, header2, header3];
const size = images.length; 

export default function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % size;
      });
    }, 5000);

    return () => clearInterval("timer");

  }, [size]);

  function handleNavigate() {
    navigate('/category');
  }

  return (
    <>
      <div className="header">
        <div className="content">
          <h2>
            Evara <span>- crafted with elegence</span>
          </h2>
          <p>Timeless style made for today. Faishon and lifestyle store for you.</p>
          <p>
            Discover effortless faishon and lifestyle products designed to elevate your every moment.
            Evara is your one step solution for shopping your needs and cater your wants.
          </p>
          <Button onClick={handleNavigate}>View Product Catalouge</Button>
        </div>
        <div className="image-slideshow"> 
            <img src={images[currentIndex]} alt="Clothes Image" className="img" />
        </div>
      </div>
    </>
  );
}
