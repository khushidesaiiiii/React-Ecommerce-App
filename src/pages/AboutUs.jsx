import about1 from "../assets/images/about/about1.jpg";
import about2 from "../assets/images/about/about2.png";
import about3 from "../assets/images/about/about3.png";

export default function AboutUs() {
  return (
    <div className="about-us">
      <div className="content">
        <h2>Know The Brand</h2>
        <p>
          Discover effortless faishon designed to elevate your every moment. At
          Evara, faishon is curated with confindence and class to match your
          lifestyle. Timeless style made for today
        </p>
        <h3>
          Evara <span> - crafted with elegence</span>
        </h3>
      </div>
      <div className="about-cards">

        <div className="about-card">
          <img src={about1} alt="Craftmanship image" />
          <div className="about-card-content">
            <h2>Best Craftmanship</h2>
            <p>
              At Evara, we have one of the best team of people from fine
              designers to artist best at that craft. Our main motto is to
              provide best services and best craft according to taste.
            </p>
          </div>
        </div>

        <div className="about-card">
          <div className="about-card-content">
            <h2>Affordable Pricing</h2>
            <p>
              With great Craftmanship, we provide best product at the most
              affordable rates. With best pricing, we still use best quality
              textiles to give a premium feel.
            </p>
          </div>
          <img src={about2} alt="Clothes" />
        </div>

        <div className="about-card">
          <img src={about3} alt="Craftmanship image" />
          <div className="about-card-content">
            <h2>New collection every month</h2>
            <p>
              Every new month brings a fresh taste for the customers that love
              Evara. With new month a new collection drops. Also, we try to do
              theme based collection to fulfill your every neeed for every
              ocassion.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
